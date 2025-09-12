# Backend - Caminando Online

Este es el backend de la aplicación Caminando Online, construido con Node.js, Express y MongoDB.

## Instalación

1. Asegurarse de tener MongoDB instalado y corriendo localmente.

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno en `.env` (ya creado).

4. Ejecutar el servidor:
   ```bash
   npm start
   ```

   Para desarrollo con recarga automática:
   ```bash
   npm run dev
   ```

## Estructura

- `server.js`: Archivo principal del servidor
- `routes/api.js`: Rutas de la API
- `models/database.js`: Configuración de la base de datos MongoDB con Mongoose
- `middleware/auth.js`: Middleware para autenticación (preparado para futuro)

## API Endpoints

- `GET /api/mockups`: Obtiene datos de mockups desde MongoDB
- `GET /api/home`: Obtiene datos de la página principal

## Base de Datos

Se usa MongoDB con los siguientes modelos:
- `User`: Para autenticación futura
- `Mockup`: Para almacenar datos de mockups

La conexión se establece automáticamente al iniciar el servidor, y se insertan datos de ejemplo si la colección está vacía.
