# 🎵 Music School API - Semana 5: PostgreSQL y Prisma ORM

API REST desarrollada con **Node.js**, **Express**, **TypeScript**, **Zod** y **Prisma ORM** conectada a una base de datos relacional **PostgreSQL**, correspondiente al proyecto de la Semana 5 del Bootcamp de Express.js.

---

## 📌 Descripción del Dominio

El dominio de este proyecto modela el núcleo de gestión de una **Escuela de Música**. El sistema permite administrar principalmente dos entidades clave interrelacionadas:
1. **Estudiantes (`Student`)**: Alumnos inscritos en la escuela, los cuales cuentan con datos de contacto, estado de actividad y opcionalmente pueden especializarse o asociarse con un instrumento musical.
2. **Instrumentos (`Instrument`)**: Catálogo de instrumentos musicales disponibles en la academia (por ejemplo, Guitarra, Piano, Violín, Batería) que pueden ser asignados a los estudiantes.

---

## 📊 Diagrama de Entidades (ERD)

```text
+-----------------------+           +-----------------------+
|      Instrument       |           |        Student        |
+-----------------------+           +-----------------------+
| id (PK) - UUID        | <----+    | id (PK) - UUID        |
| name - String         |      |    | name - String         |
| family - String       |      |    | email (UQ) - String   |
| createdAt - DateTime  |      |    | isActive - Boolean    |
| updatedAt - DateTime  |      |    | instrumentId (FK)     |
+-----------------------+      |    | createdAt - DateTime  |
                                    | updatedAt - DateTime  |
         1                      N   +-----------------------+
     [ Instrument ] ----------------> [ Student ]
     (Un instrumento puede tener varios estudiantes inscritos,
      y un estudiante puede tener opcionalmente un instrumento)
```

---

## 🚀 Endpoints Documentados

Base URL del servidor: `http://localhost:3000/api/v1`

---

### 1. Crear un Estudiante
* **Método:** `POST`
* **Ruta:** `/students`
* **Descripción:** Registra un nuevo estudiante en la base de datos con validación previa de esquemas mediante Zod.

#### Request:
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**
```json
{
  "name": "Laura Gómez",
  "email": "laura.gomez@example.com",
  "isActive": true
}
```

#### Response (`201 Created`):
```json
{
  "success": true,
  "message": "Estudiante creado exitosamente",
  "data": {
    "id": "8a393147-966f-473b-8184-713aa4045f7f",
    "name": "Laura Gómez",
    "email": "laura.gomez@example.com",
    "isActive": true,
    "instrumentId": null,
    "createdAt": "2026-09-25T13:27:01.409Z",
    "updatedAt": "2026-09-25T13:27:01.409Z"
  }
}
```

---

### 2. Listar Estudiantes (Con Paginación)
* **Método:** `GET`
* **Ruta:** `/students?page=1&limit=10`
* **Descripción:** Obtiene una lista paginada de todos los estudiantes registrados.

#### Request:
* **Query Params:**
  * `page` (opcional): Número de página (por defecto `1`).
  * `limit` (opcional): Cantidad de elementos por página (por defecto `10`).

#### Response (`200 OK`):
```json
{
  "success": true,
  "data": [
    {
      "id": "8a393147-966f-473b-8184-713aa4045f7f",
      "name": "Laura Gómez",
      "email": "laura.gomez@example.com",
      "isActive": true,
      "instrumentId": null,
      "createdAt": "2026-09-25T13:27:01.409Z",
      "updatedAt": "2026-09-25T13:27:01.409Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

---

### 3. Obtener Estudiante por ID
* **Método:** `GET`
* **Ruta:** `/students/:id`
* **Descripción:** Busca y retorna la información detallada de un estudiante específico según su identificador UUID.

#### Request:
* **URL Params:** `id = 8a393147-966f-473b-8184-713aa4045f7f`

#### Response (`200 OK`):
```json
{
  "success": true,
  "data": {
    "id": "8a393147-966f-473b-8184-713aa4045f7f",
    "name": "Laura Gómez",
    "email": "laura.gomez@example.com",
    "isActive": true,
    "instrumentId": null,
    "createdAt": "2026-09-25T13:27:01.409Z",
    "updatedAt": "2026-09-25T13:27:01.409Z"
  }
}
```

---

### 4. Actualizar un Estudiante
* **Método:** `PUT` / `PATCH`
* **Ruta:** `/students/:id`
* **Descripción:** Actualiza de forma parcial o total los datos de un estudiante existente.

#### Request:
* **URL Params:** `id = 8a393147-966f-473b-8184-713aa4045f7f`
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**
```json
{
  "name": "Laura Gómez Actualizada",
  "isActive": false
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Estudiante actualizado exitosamente",
  "data": {
    "id": "8a393147-966f-473b-8184-713aa4045f7f",
    "name": "Laura Gómez Actualizada",
    "email": "laura.gomez@example.com",
    "isActive": false,
    "instrumentId": null,
    "createdAt": "2026-09-25T13:27:01.409Z",
    "updatedAt": "2026-09-25T13:35:42.110Z"
  }
}
```

---

### 5. Eliminar un Estudiante
* **Método:** `DELETE`
* **Ruta:** `/students/:id`
* **Descripción:** Elimina un registro de estudiante de la base de datos de forma permanente.

#### Request:
* **URL Params:** `id = 8a393147-966f-473b-8184-713aa4045f7f`

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Estudiante eliminado exitosamente"
}
```

---

## 🛠️ Instalación y Ejecución Local

1. Clonar el repositorio y navegar a la carpeta del proyecto.
2. Instalar dependencias:
   ```bash
   pnpm install
   ```
3. Configurar las variables de entorno en un archivo `.env` basándose en `.env.example` (incluyendo la URL de conexión a PostgreSQL).
4. Levantar la base de datos con Docker Compose:
   ```bash
   docker-compose up -d
   ```
5. Ejecutar migraciones de Prisma:
   ```bash
   pnpm prisma migrate dev
   ```
6. Iniciar el servidor en modo desarrollo:
   ```bash
   pnpm dev
