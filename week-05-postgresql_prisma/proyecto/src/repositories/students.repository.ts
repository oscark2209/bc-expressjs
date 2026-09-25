import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

export class StudentsRepository {
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.student.findMany({
        skip,
        take: limit,
        include: { instrument: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.student.count(),
    ]);
    return { data, total, page, limit };
  }

  async findById(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        instrument: true,
        lessons: { include: { teacher: true } },
      },
    });

    if (!student) {
      throw new AppError(404, 'Recurso no encontrado');
    }

    return student;
  }

  async create(data: Prisma.StudentUncheckedCreateInput) {
    try {
      return await prisma.student.create({
        data,
        include: { instrument: true },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new AppError(409, 'Ya existe un registro con ese valor');
      }
      throw err;
    }
  }

  async update(id: string, data: Prisma.StudentUncheckedUpdateInput) {
    try {
      return await prisma.student.update({
        where: { id },
        data,
        include: { instrument: true },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new AppError(404, 'Recurso no encontrado');
        }
        if (err.code === 'P2002') {
          throw new AppError(409, 'Ya existe un registro con ese valor');
        }
      }
      throw err;
    }
  }

  async remove(id: string) {
    try {
      await prisma.student.delete({
        where: { id },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new AppError(404, 'Recurso no encontrado');
      }
      throw err;
    }
  }
}