import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { SchoolData } from './types.js';

export async function readSchoolData(): Promise<SchoolData> {
  const filePath = join(process.cwd(), 'data', 'school.json');

  try {
    const rawData = await readFile(filePath, 'utf-8');
    return JSON.parse(rawData) as SchoolData;
  } catch (error) {
    console.error('❌ Error grave: No se pudo encontrar o leer el archivo "data/school.json"');
    process.exit(1);
  }
}