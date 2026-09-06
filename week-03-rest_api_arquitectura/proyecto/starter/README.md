# 🎼 API REST — Escuela de Música (Semana 03)

Entrega del proyecto correspondiente a la **Semana 03**. Implementación de una API RESTful robusta bajo una **arquitectura estricta de 4 capas** (`routes` → `controllers` → `services` → `repositories`), desarrollada con Node.js, TypeScript y resolución de módulos ESM (`node16`/`nodenext`).

---

## 🎯 Objetivo de la Semana
Construir una API REST completa desacoplando responsabilidades por capas, aplicando operaciones asíncronas, copias defensivas de datos (`structuredClone`), contratos de respuesta estándar con paginación (`page` y `limit`), y tipado estricto en TypeScript[cite: 2].

---

## 🏛️ Dominio Asignado y Entidades

El sistema gestiona los recursos de una **Escuela de Música**[cite: 2], teniendo como recurso principal de esta iteración a los **estudiantes (`students`)**:

### Entidad Principal (`Student`)
* `id` (number): Identificador único autoincremental.
* `fullName` (string): Nombre y apellido del alumno.
* `email` (string): Correo electrónico de contacto.
* `instrumentId` (number): Identificador del instrumento que estudia.
* `teacherId` (number): Identificador del profesor asignado.
* `active` (boolean): Estado de la matrícula (activo / inactivo).
* `createdAt` (string): Fecha de registro en formato ISO.

---

## 🏗️ Arquitectura en 4 Capas

El proyecto separa responsabilidades de manera estricta:

1. **`repositories/`**: Única capa con acceso directo a la tienda de datos en memoria. Implementa métodos asíncronos (`async/await`) y protección de estado mediante copias defensivas (`structuredClone`).
2. **`services/`**: Contiene la lógica de negocio pura y el cálculo de paginación. **No contiene ningún tipo de importación de Express**.
3. **`controllers/`**: Controladores delgados (*thin controllers*) de 3 pasos: extraer request $\rightarrow$ invocar al servicio $\rightarrow$ responder HTTP con el código de estado adecuado.
4. **`routes/`**: Encargado exclusivamente del mapeo de las URLs y verbos HTTP hacia los métodos del controlador.

---

## ⚙️ Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   pnpm install# 🎼 API REST — Escuela de Música (Semana 03)

Entrega del proyecto correspondiente a la **Semana 03**[cite: 2]. Implementación de una API RESTful robusta bajo una **arquitectura estricta de 4 capas** (`routes` → `controllers` → `services` → `repositories`), desarrollada con Node.js, TypeScript y resolución de módulos ESM (`node16`/`nodenext`).

---

## 🎯 Objetivo de la Semana
Construir una API REST completa desacoplando responsabilidades por capas, aplicando operaciones asíncronas, copias defensivas de datos (`structuredClone`), contratos de respuesta estándar con paginación (`page` y `limit`), y tipado estricto en TypeScript[cite: 2].

---

## 🏛️ Dominio Asignado y Entidades

El sistema gestiona los recursos de una **Escuela de Música**[cite: 2], teniendo como recurso principal de esta iteración a los **estudiantes (`students`)**:

### Entidad Principal (`Student`)
* `id` (number): Identificador único autoincremental.
* `fullName` (string): Nombre y apellido del alumno.
* `email` (string): Correo electrónico de contacto.
* `instrumentId` (number): Identificador del instrumento que estudia.
* `teacherId` (number): Identificador del profesor asignado.
* `active` (boolean): Estado de la matrícula (activo / inactivo).
* `createdAt` (string): Fecha de registro en formato ISO.

---

## 🏗️ Arquitectura en 4 Capas

El proyecto separa responsabilidades de manera estricta:

1. **`repositories/`**: Única capa con acceso directo a la tienda de datos en memoria. Implementa métodos asíncronos (`async/await`) y protección de estado mediante copias defensivas (`structuredClone`).
2. **`services/`**: Contiene la lógica de negocio pura y el cálculo de paginación. **No contiene ningún tipo de importación de Express**.
3. **`controllers/`**: Controladores delgados (*thin controllers*) de 3 pasos: extraer request $\rightarrow$ invocar al servicio $\rightarrow$ responder HTTP con el código de estado adecuado.
4. **`routes/`**: Encargado exclusivamente del mapeo de las URLs y verbos HTTP hacia los métodos del controlador.

---

## ⚙️ Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   pnpm install