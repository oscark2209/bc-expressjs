
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed para Escuela de Música...');

  // 1. Instrumentos (Recurso secundario)
  const guitar = await prisma.instrument.upsert({
    where: { name: 'Guitarra Acústica' },
    update: {},
    create: { name: 'Guitarra Acústica', family: 'Cuerda' },
  });

  const piano = await prisma.instrument.upsert({
    where: { name: 'Piano de Cola' },
    update: {},
    create: { name: 'Piano de Cola', family: 'Teclado' },
  });

  const violin = await prisma.instrument.upsert({
    where: { name: 'Violín' },
    update: {},
    create: { name: 'Violín', family: 'Cuerda Frotada' },
  });

  // 2. Profesores
  const teacher1 = await prisma.teacher.upsert({
    where: { email: 'carlos.manta@music.edu' },
    update: {},
    create: { name: 'Carlos Manta', email: 'carlos.manta@music.edu', specialty: 'Guitarra' },
  });

  const teacher2 = await prisma.teacher.upsert({
    where: { email: 'elena.rodriguez@music.edu' },
    update: {},
    create: { name: 'Elena Rodríguez', email: 'elena.rodriguez@music.edu', specialty: 'Piano' },
  });

  // 3. Estudiantes (Recurso principal - Mínimo 5 registros)
  const studentsData = [
    { name: 'Ana Gómez', email: 'ana.gomez@student.edu', instrumentId: guitar.id },
    { name: 'Luis Pérez', email: 'luis.perez@student.edu', instrumentId: piano.id },
    { name: 'Sofía Torres', email: 'sofia.torres@student.edu', instrumentId: violin.id },
    { name: 'Mateo Ruiz', email: 'mateo.ruiz@student.edu', instrumentId: guitar.id },
    { name: 'Lucía Fernández', email: 'lucia.fernandez@student.edu', instrumentId: piano.id },
  ];

  const createdStudents = [];
  for (const std of studentsData) {
    const student = await prisma.student.upsert({
      where: { email: std.email },
      update: {},
      create: std,
    });
    createdStudents.push(student);
  }

  // 4. Clases de prueba
  await prisma.lesson.createMany({
    data: [
      {
        date: new Date('2026-06-01T10:00:00Z'),
        topic: 'Acordes Mayores Básicos',
        studentId: createdStudents[0].id,
        teacherId: teacher1.id,
      },
      {
        date: new Date('2026-06-02T11:30:00Z'),
        topic: 'Escalas de Do Mayor',
        studentId: createdStudents[1].id,
        teacherId: teacher2.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    throw new Error('El proceso de seed falló.');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });