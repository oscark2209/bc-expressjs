import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Obtener todos los estudiantes
export const getStudents = async (req: Request, res: Response): Promise<Response> => {
  try {
    const students = await prisma.student.findMany();
    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los estudiantes',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// 2. Obtener un estudiante por ID
export const getStudentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el estudiante',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// 3. Crear un estudiante
export const createStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, isActive, instrumentId } = req.body;
    
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        isActive,
        instrumentId,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Estudiante creado exitosamente',
      data: newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear el estudiante',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// 4. Actualizar un estudiante
export const updateStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const updateData = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      message: 'Estudiante actualizado exitosamente',
      data: updatedStudent,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Estudiante no encontrado o error al actualizar',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// 5. Eliminar un estudiante
export const deleteStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await prisma.student.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Estudiante eliminado exitosamente',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Estudiante no encontrado o error al eliminar',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};