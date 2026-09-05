# 🎼 Escuela de Música API - Documentación General del Proyecto

REST API completa, modular y escalable desarrollada con **Node.js**, **Express** y **TypeScript** para la administración global de una Escuela de Música. El sistema gestiona integralmente el ciclo de vida de matriculación de estudiantes, asignación de cuerpo docente, catálogo de instrumentos y la programación de clases.

---

## 📌 Visión General y Dominio

La plataforma permite digitalizar las operaciones académicas y administrativas de la academia. A través de un diseño modular, el sistema soporta la gestión cruzada de 4 entidades fundamentales del dominio:

### 🏛️ Modelo de Entidades del Dominio

* **`Student` (Estudiante):** Gestiona los datos de los alumnos inscritos (`fullName`, `email`), su estado de matrícula (`active`) y sus vinculaciones con un profesor e instrumento (`teacherId`, `instrumentId`).
* **`Teacher` (Profesor):** Registra la información del cuerpo docente, especialidades musicales e información de contacto.
* **`Instrument` (Instrumento):** Catálogo de instrumentos que imparte la escuela, organizados por nombre y familia instrumental (ej. Viento, Cuerda, Percusión).
* **`Lesson` (Lección / Clase):** Modela las clases agendadas relacionando a un estudiante con su profesor, junto con el horario y estado de la sesión.

---

## 🛠️ Arquitectura y Tecnologías

* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Lenguaje:** TypeScript con tipado estricto e interfaces claras de dominio (`src/types.ts`).
* **Resolución de Módulos:** NodeNext / ECMAScript Modules (ESM).
* **Ejecutor en Desarrollo:** `tsx`.
* **Gestor de Paquetes:** Pnpm / Npm.
* **Diseño Arquitectónico:**
  * **Patrón `createApp`:** Desacoplamiento de la configuración de Express (`src/app.ts`) de la inicialización de red.
  * **Ciclo de Vida del Servidor:** Control explícito del servidor y **Graceful Shutdown** (`SIGINT`/`SIGTERM`) en `src/server.ts`.
  * **Persistencia Temporizada:** Almacenamiento centralizado en memoria (`src/store.ts`).

---