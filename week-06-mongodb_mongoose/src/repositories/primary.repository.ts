import { TeacherModel, ITeacher } from '../model/teacher.model';
import { AppError } from '../errors/appError';
import { Types } from 'mongoose';

export async function getAll(page = 1, limit = 10, search?: string) {
  const skip = (page - 1) * limit;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  const [data, total] = await Promise.all([
    TeacherModel.find(query)
      .populate('instrument')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    TeacherModel.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function getById(id: string | Types.ObjectId): Promise<ITeacher> {
  try {
    const item = await TeacherModel.findById(id).populate('instrument');
    if (!item) throw new AppError(404, 'Profesor no encontrado');
    return item;
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    if (err.name === 'CastError') throw new AppError(400, 'ID de profesor inválido');
    throw err;
  }
}

export async function create(data: Partial<ITeacher>): Promise<ITeacher> {
  try {
    const newItem = await TeacherModel.create(data);
    return await newItem.populate('instrument');
  } catch (err: any) {
    if (err.code === 11000) throw new AppError(409, 'El correo del profesor ya está registrado');
    if (err.name === 'CastError') throw new AppError(400, 'Referencia de instrumento inválida');
    throw err;
  }
}

export async function update(id: string | Types.ObjectId, data: Partial<ITeacher>): Promise<ITeacher> {
  try {
    const updated = await TeacherModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('instrument');

    if (!updated) throw new AppError(404, 'Profesor no encontrado para actualizar');
    return updated;
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    if (err.code === 11000) throw new AppError(409, 'El correo ya está registrado');
    if (err.name === 'CastError') throw new AppError(400, 'ID o referencia inválida');
    throw err;
  }
}

export async function remove(id: string | Types.ObjectId): Promise<void> {
  try {
    const deleted = await TeacherModel.findByIdAndDelete(id);
    if (!deleted) throw new AppError(404, 'Profesor no encontrado para eliminar');
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    if (err.name === 'CastError') throw new AppError(400, 'ID de profesor inválido');
    throw err;
  }
}