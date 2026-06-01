# 🎟️ Sistema de Gestión de Tickets

Aplicación full-stack diseñada para la gestión eficiente de tickets de soporte técnico. Incluye una API robusta construida con **NestJS** y una interfaz de usuario dinámica desarrollada con **React**.

---

## 🏗️ Arquitectura del Proyecto
El proyecto está estructurado en dos carpetas principales:
* `/backend-support`: Servidor NestJS con PostgreSQL y TypeORM.
* `/frontend`: Aplicación cliente React con Tailwind CSS.

---

## 🚀 Requisitos Previos
Asegúrate de tener instalados:
* [Node.js](https://nodejs.org/) (v18 o superior).
* [PostgreSQL](https://www.postgresql.org/) corriendo localmente.
* [Git](https://git-scm.com/).

---

## ⚙️ Configuración y Ejecución

### 1. Backend (API)
1. Entra a la carpeta: `cd backend-support`
2. Instala dependencias: `npm install`
3. Configura tu base de datos en `src/app.module.ts` (asegúrate de que el puerto `5433` y las credenciales coincidan con tu base local).
4. Ejecuta en modo desarrollo:
   ```bash
   npm run start:dev
   ```
   
   La API estará disponible en `http://localhost:3000`.

### 2. Frontend (Cliente)

1. En una nueva terminal, entra a la carpeta: `cd frontend`
2. Instala dependencias: `npm install`
3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en la URL que indique la terminal (usualmente http://localhost:5173).

## 🧪 Pruebas
Para ejecutar las pruebas unitarias y verificar que los componentes funcionen correctamente:

```bash
# Dentro de la carpeta backend-support
npm run test
```

## 💡 Notas Adicionales
**Semillado de datos:** Si necesitas datos de prueba, puedes ejecutar `ts-node` `src/seed.ts` dentro de la carpeta `backend-support` para poblar tu base de datos rápidamente.

**Seguridad:** Las credenciales de la base de datos están en el código fuente para fines de desarrollo; en producción, utiliza siempre variables de entorno (`.env`).
