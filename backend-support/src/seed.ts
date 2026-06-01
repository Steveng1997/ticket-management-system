/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from './tickets/entities/ticket.entity'; // Asegúrate de que esta ruta sea correcta
import { Repository } from 'typeorm';

async function bootstrap(): Promise<void> {
  // Creamos el contexto de la aplicación para acceder a los servicios
  const app = await NestFactory.createApplicationContext(AppModule);

  // Obtenemos el repositorio del Ticket
  const repo = app.get<Repository<Ticket>>(getRepositoryToken(Ticket));

  // Datos iniciales de prueba
  const tickets = [
    {
      title: 'Error en Login',
      description: 'No funciona el botón de acceso',
      status: 'pending',
      priority: 'high',
    },
    {
      title: 'Problema de Diseño',
      description: 'El logo se ve borroso en mobile',
      status: 'in_progress',
      priority: 'low',
    },
    {
      title: 'Mantenimiento de Servidor',
      description: 'Actualización de dependencias críticas',
      status: 'resolved',
      priority: 'medium',
    },
  ];

  try {
    console.log('Iniciando inserción de datos de prueba...');

    for (const t of tickets) {
      const ticket = repo.create(t as any);
      await repo.save(ticket);
    }

    console.log('✅ Datos insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
  } finally {
    // Cerramos la aplicación para liberar recursos
    await app.close();
  }
}

// Ejecución con manejo de promesa para cumplir con el Linter
void bootstrap();
