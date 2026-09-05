import type { Instrument, Summary } from './types.js';

export function filterByCategory(instruments: Instrument[], category: string): Instrument[] {
  return instruments.filter((i) => i.category.toLowerCase() === category.toLowerCase());
}

export function calculateSummary(instruments: Instrument[]): Summary {
  if (instruments.length === 0) {
    return {
      totalInstruments: 0,
      activeCount: 0,
      inactiveCount: 0,
      averageFee: 0,
      mostExpensive: null,
      cheapest: null
    };
  }

  const totalInstruments = instruments.length;
  const activeCount = instruments.filter((i) => i.stock > 0).length;
  const inactiveCount = instruments.filter((i) => i.stock === 0).length;

  const totalFee = instruments.reduce((sum, i) => sum + i.monthlyFee, 0);
  const averageFee = Number((totalFee / totalInstruments).toFixed(2));

  const mostExpensive = instruments.reduce((max, i) => (i.monthlyFee > max.monthlyFee ? i : max), instruments[0]);
  const cheapest = instruments.reduce((min, i) => (i.monthlyFee < min.monthlyFee ? i : min), instruments[0]);

  return {
    totalInstruments,
    activeCount,
    inactiveCount,
    averageFee,
    mostExpensive,
    cheapest
  };
}