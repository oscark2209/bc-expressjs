import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { InstrumentModel } from './model/instrument.model';
import { TeacherModel } from './model/teacher.model';

async function seed(): Promise<void> {
  await connectDB();

  await TeacherModel.deleteMany({});
  await InstrumentModel.deleteMany({});
  console.log('Collections cleared');

  const [guitarra, piano] = await InstrumentModel.insertMany([
    { name: 'Guitarra Clásica', family: 'Cuerda' },
    { name: 'Piano de Cola', family: 'Teclado' },
  ]);
  console.log('Secondary entities (Instruments) inserted');

  await TeacherModel.insertMany([
    {
      name: 'Andrés Segovia',
      email: 'segovia@music.com',
      instrument: guitarra._id,
    },
    {
      name: 'Frédéric Chopin',
      email: 'chopin@music.com',
      instrument: piano._id,
    },
  ]);
  console.log('Primary entities (Teachers) inserted with populate');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});