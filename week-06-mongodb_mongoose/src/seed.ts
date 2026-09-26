import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { InstrumentModel } from './models/instrument.model';
import { TeacherModel } from './models/teacher.model';
import { UserModel } from './models/user.model';

async function seed(): Promise<void> {
  await connectDB();

  const seedUser = await UserModel.findOne().select('_id');
  if (!seedUser) throw new Error('Registra un usuario antes de ejecutar el seed para asignar addedBy.');

  await TeacherModel.deleteMany({});
  await InstrumentModel.deleteMany({});
  console.log('Collections cleared');

  const [guitarra, piano] = await InstrumentModel.insertMany([
    { name: 'Guitarra Clásica', family: 'Cuerda', addedBy: seedUser._id },
    { name: 'Piano de Cola', family: 'Teclado', addedBy: seedUser._id },
  ]);
  console.log('Secondary entities (Instruments) inserted');

  await TeacherModel.insertMany([
    {
      name: 'Andrés Segovia',
      email: 'segovia@music.com',
      specialty: 'Guitarra clásica',
      instruments: [guitarra._id],
      addedBy: seedUser._id,
    },
    {
      name: 'Frédéric Chopin',
      email: 'chopin@music.com',
      specialty: 'Piano',
      instruments: [piano._id],
      addedBy: seedUser._id,
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