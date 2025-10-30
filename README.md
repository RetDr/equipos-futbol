# Backend Gestión de Equipos de Fútbol

Proyecto académico - Sistemas Distribuidos UPTC

## Descripción

Backend API RESTful desarrollado en Node.js y Express, permite gestionar equipos de fútbol con operaciones CRUD, consultas numéricas y estadísticas agrupadas. Dockerizado con base SQLite para persistencia.

## Cómo usar

1. Clona el repositorio:
git clone https://github.com/RetDr/equipos-futbol.git

2. Instala dependencias:
npm install


3. Ejecuta el backend:
npm start

4. Ejemplo endpoints principales:
- Crear equipo: `POST /equipos`
- Listar equipos: `GET /equipos`
- Modificar: `PUT /equipos/:id`
- Eliminar: `DELETE /equipos/:id`
- Buscar por rango: `GET /equipos/puntos/:min/:max`
- Estadísticas: `GET /estadisticas/goles-por-liga`

## Docker

Para descargar la imagen y usar Docker:

docker pull RetDr/equipos-futbol:1.0
docker run -p 3000:3000 -v C:/ruta/database.db:/app/database.db retdr/equipos-futbol:1.0
