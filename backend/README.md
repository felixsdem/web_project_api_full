# Around the U.S. — Backend

Backend del proyecto "Around the U.S." desarrollado con Node.js, Express y MongoDB.

## Descripción

Este proyecto implementa una API REST para el proyecto Around the U.S. El servidor permite gestionar usuarios y tarjetas almacenados en una base de datos MongoDB.

La API incluye las siguientes funcionalidades:

- Obtener todos los usuarios.
- Obtener un usuario mediante su ID.
- Crear nuevos usuarios.
- Actualizar el perfil del usuario.
- Actualizar el avatar del usuario.
- Obtener todas las tarjetas.
- Crear nuevas tarjetas.
- Eliminar tarjetas.
- Dar "like" a una tarjeta.
- Quitar el "like" de una tarjeta.
- Gestionar respuestas de error 400, 404 y 500.
- Servir datos en formato JSON.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript
- Nodemon
- ESLint
- Airbnb JavaScript Style Guide

## Rutas principales

### Usuarios

`GET /users`

Devuelve todos los usuarios.

`GET /users/:userId`

Devuelve un usuario específico mediante su ID.

`POST /users`

Crea un nuevo usuario.

`PATCH /users/me`

Actualiza el nombre y la descripción del usuario actual.

`PATCH /users/me/avatar`

Actualiza el avatar del usuario actual.

### Tarjetas

`GET /cards`

Devuelve todas las tarjetas.

`POST /cards`

Crea una nueva tarjeta.

`DELETE /cards/:cardId`

Elimina una tarjeta mediante su ID.

`PUT /cards/:cardId/likes`

Añade un "like" a una tarjeta.

`DELETE /cards/:cardId/likes`

Elimina el "like" del usuario actual.

## Ejecución del proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm run start
```

El servidor se ejecuta en:

`http://localhost:3000`

Para iniciar el servidor con Nodemon:

```bash
npm run dev
```

## Base de datos

El proyecto utiliza MongoDB como sistema de almacenamiento de datos.

La aplicación se conecta a la base de datos:

`mongodb://localhost:27017/aroundb`

## Linter

Para comprobar el código con ESLint:

```bash
npm run lint
```
