# 🎵 Music School API (Node.js, Express, Mongoose & Zod)

API RESTful profesional desarrollada bajo arquitectura **MVC**, validación estricta de esquemas con **Zod**, modelado de datos con **Mongoose** y un sistema centralizado de control de errores. Diseñada para la gestión integral de una **Escuela de Música**.

---

## 🏛️ Descripción del Dominio
El sistema automatiza la administración interna de una institución educativa musical, permitiendo gestionar de forma eficiente el talento humano docente, el inventario de recursos instrumentales, la inscripción de estudiantes y la programación de clases personalizadas.

---

## 📦 Entidades y Estructura de Datos

### 1. Teachers (Profesores)
Instructores capacitados que imparten la formación académica en la escuela.
* `_id` (ObjectId): Identificador único autogenerado.
* `name` (String): Nombre completo del profesor.
* `email` (String): Correo electrónico institucional único.
* `specialty` (String): Especialidad o género musical principal.
* `instruments` (Array of ObjectId): Relación con los instrumentos que domina.

### 2. Instruments (Instrumentos)
Catálogo oficial de instrumentos musicales disponibles para las clases y prácticas.
* `_id` (ObjectId): Identificador único.
* `name` (String): Nombre comercial del instrumento (ej. *Guitarra Acústica*, *Piano de Cola*, *Violín*).
* `category` (String): Familia instrumental (*Cuerda*, *Viento*, *Percusión*, *Teclados*).
* `stock` (Number): Cantidad disponible en la escuela.
* `pricePerHour` (Number): Tarifa por hora de instrucción o alquiler.

### 3. Students (Estudiantes)
Alumnos matriculados en los distintos programas de formación musical.
* `_id` (ObjectId): Identificador único.
* `fullName` (String): Nombre completo del alumno.
* `age` (Number): Edad del estudiante.
* `level` (String): Nivel técnico (*Principiante*, *Intermedio*, *Avanzado*).
* `enrolledInstrument` (ObjectId): Instrumento principal asignado.

### 4. Lessons (Lecciones / Clases)
Sesiones de aprendizaje programadas entre instructores y alumnos.
* `_id` (ObjectId): Identificador único.
* `title` (String): Motivo o descripción de la lección.
* `teacherId` (ObjectId): Referencia al profesor asignado.
* `studentId` (ObjectId): Referencia al estudiante participante.
* `date` (Date): Fecha y hora agendada.
* `status` (String): Estado actual (*Scheduled*, *Completed*, *Cancelled*).

---

## 🚀 Endpoints de la API

La API expone los siguientes recursos REST bajo la ruta base `/api`:

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/teachers` | Obtiene el listado general de profesores. |
| **POST** | `/api/teachers` | Registra un nuevo profesor (Validado con Zod). |
| **GET** | `/api/instruments` | Lista todos los instrumentos del catálogo. |
| **GET** | `/api/students` | Consulta el listado de alumnos inscritos. |
| **POST** | `/api/students` | Da de alta a un nuevo estudiante. |
| **GET** | `/api/lessons` | Consulta el cronograma completo de lecciones. |
| **POST** | `/api/lessons` | Programa una nueva clase o lección. |
| **DELETE**| `/api/lessons/:id` | Elimina o cancela una lección específica. |

---

## ⚠️ Manejo Global de Errores
La aplicación implementa un middleware centralizado que captura excepciones y responde con códigos de estado estandarizados:
* **`400 Bad Request`**: Datos inválidos o errores de validación de esquemas con Zod.
* **`404 Not Found`**: Recursos o identificadores no encontrados en la base de datos de MongoDB.
* **`409 Conflict`**: Conflictos de unicidad (ej. correos de profesores ya registrados).

---

## 📸 Evidencias y Capturas del Sistema

### 1. Inicialización de Datos (Seed)
![Pnpm Seed](./assets/pnpm%20seed.png)

### 2. Consultas (GET)
* **Listado de Profesores:**
![Get Teachers](../assets/get%20teachers.png)

* **Listado de Instrumentos:**
![Get Instrument](../assets/get%20instrument.png)

* **Consulta por ID:**
![Get By ID](../assets/get%20by%20id.png)

### 3. Operaciones de Creación y Modificación
* **Creación de Registros (POST):**
![Post](../assets/post.png)

* **Actualización de Registros (PUT):**
![Put](../assets/put.png)

### 4. Eliminación de Registros (DELETE)
![Delete](../assets/delete.png)
