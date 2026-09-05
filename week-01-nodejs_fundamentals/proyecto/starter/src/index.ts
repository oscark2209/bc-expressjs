import { readSchoolData } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { saveReport } from './reporter.js';
import type { Report, Instrument } from './types.js';

async function main(): Promise<void> {
  console.log('🎼 --- PROCESADOR DE DATOS: ESCUELA DE MÚSICA --- 🎼');

  // 1. Leer datos del archivo JSON
  const schoolData = await readSchoolData();
  const { instruments } = schoolData;

  // 2. Extraer categorías disponibles tipando el parámetro explícitamente
  const availableCategories = [...new Set(instruments.map((i: Instrument) => i.category.toLowerCase()))];

  // 3. Capturar argumento CLI (--category)
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');
  
  let targetCategory: string | null = null;
  if (categoryIndex !== -1 && args[categoryIndex + 1]) {
    targetCategory = args[categoryIndex + 1].toLowerCase();
  }

  let filteredInstruments = instruments;

  // 4. Manejo de filtro por categoría y errores/avisos
  if (targetCategory) {
    if (!availableCategories.includes(targetCategory)) {
      console.warn(`\n⚠️ La categoría '${targetCategory}' no existe en la escuela.`);
      console.log(`Categorías disponibles: ${availableCategories.join(', ')}\n`);
      process.exit(0);
    }
    filteredInstruments = filterByCategory(instruments, targetCategory);
    console.log(`\n🔍 Filtrando catálogo por categoría: "${targetCategory}"`);
  } else {
    console.log('\n📊 Procesando el catálogo completo...');
  }

  // 5. Calcular resumen
  const summary = calculateSummary(filteredInstruments);

  console.log('\n--- RESUMEN DE INSTRUMENTOS ---');
  console.log(`Total de instrumentos: ${summary.totalInstruments}`);
  console.log(`Disponibles (Stock > 0): ${summary.activeCount} | Agotados: ${summary.inactiveCount}`);
  console.log(`Tarifa mensual promedio: $${summary.averageFee}`);
  
  if (summary.mostExpensive) {
    console.log(`Más costoso: ${summary.mostExpensive.name} ($${summary.mostExpensive.monthlyFee})`);
  }
  if (summary.cheapest) {
    console.log(`Más económico: ${summary.cheapest.name} ($${summary.cheapest.monthlyFee})`);
  }

  // 6. Construir objeto de reporte
  const report: Report = {
    generatedAt: new Date().toISOString(),
    filterCategory: targetCategory,
    summary,
    instruments: filteredInstruments
  };

  // 7. Guardar reporte en el archivo output/report.json
  await saveReport(report);
}

main();