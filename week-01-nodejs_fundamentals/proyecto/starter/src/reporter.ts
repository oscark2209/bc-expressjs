import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

export async function saveReport(report: Report): Promise<void> {
  const outputDir = join(import.meta.dirname, '..', 'output');
  const filePath = join(outputDir, 'report.json');

  // Crear la carpeta output si no existe
  await mkdir(outputDir, { recursive: true });

  await writeFile(filePath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n✅ Reporte generado con éxito en: output/report.json`);
}