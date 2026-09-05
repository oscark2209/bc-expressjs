# 🎼 Escuela de Música API - Semana 02: Express Intro

REST API inicial para la gestión del dominio de una Escuela de Música, desarrollada con **Node.js**, **Express** y **TypeScript**. En esta fase se implementa la arquitectura base del proyecto, el manejo de rutas modulares, el almacenamiento temporal en memoria y el cierre ordenado del servidor (*Graceful Shutdown*).

---

## 🚀 Características de la Semana 02

* **Servidor Express y Función Constructora:** Estructura basada en la exportación de `createApp()` desde `src/app.ts` para facilitar la gestión del ciclo de vida del servidor.
* **Cierre Ordenado (*Graceful Shutdown*):** Manejo seguro de señales de terminación del sistema (`SIGINT` y `SIGTERM`) en `src/server.ts` para finalizar conexiones activas antes de salir.
* **Tipado Estricto con TypeScript:** Definición de tipos e interfaces para el dominio (`Student`, `Teacher`, `Instrument`, `Lesson`) y DTOs para la manipulación de datos.
* **Resolución ESM / NodeNext:** Configuración para la importación y compilación nativa de módulos ECMAScript utilizando extensiones `.js` explícitas en rutas locales.
* **CRUD Completo de Estudiantes:** Rutas y endpoints para crear, leer, actualizar y eliminar alumnos con almacenamiento en memoria (`store.ts`).
* **Manejo de Errores HTTP:** Respuestas JSON estandarizadas para recursos no encontrados (`404 Not Found`) y peticiones inválidas (`400 Bad Request`).

---

## 🛠️ Tecnologías Utilizadas

* **Runtime:** Node.js
* **Framework:** Express.js
* **Lenguaje:** TypeScript
* **Ejecutor:** `tsx`
* **Módulos:** NodeNext / ESM (ECMAScript Modules)
* **Control de Versiones:** Git (Rama: `semana-02`)

---

## 📁 Estructura del Proyecto

```text
starter/
├── src/
│   ├── routes/
│   │   └── students.routes.ts   # Router con las operaciones CRUD de estudiantes
│   ├── app.ts                   # Configuración del servidor y middlewares (createApp)
│   ├── server.ts                # Inicialización del servidor y Graceful Shutdown
│   ├── store.ts                 # Almacenamiento y persistencia en memoria
│   └── types.ts                 # Definiciones de tipos e interfaces del dominio
├── package.json
├── tsconfig.json
└── README.md