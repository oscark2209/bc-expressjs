import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3000';
const app = createApp();

// Guardamos la referencia del servidor
const server = app.listen(Number(PORT), () => {
  console.log(`🚀 Escuela de Música API ejecutándose en http://localhost:${PORT}`);
});

// Función centralizada para el cierre limpio
function shutdown(signal: string): void {
  console.log(`\n⚠️ Recibida señal ${signal}. Cerrando servidor limpiamente...`);

  server.close(() => {
    console.log('🛑 Servidor cerrado. Conexiones terminadas.');
    process.exit(0);
  });

  // Timeout para forzar el cierre si hay conexiones colgadas
  setTimeout(() => {
    console.error('❌ Cierre forzado por timeout.');
    process.exit(1);
  }, 10000);
}

// Captura de señales del sistema (SIGINT = Ctrl+C, SIGTERM = Señal de terminación)
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));