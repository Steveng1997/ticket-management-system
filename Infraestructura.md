# Propuesta de Infraestructura en AWS

Para desplegar esta aplicación en un entorno de producción utilizando los servicios de Amazon Web Services (AWS), se propone la siguiente arquitectura:

## 1. Backend (NestJS)
* **Servicio:** AWS App Runner o Amazon ECS (Elastic Container Service) con AWS Fargate.
* **Justificación:** Permite ejecutar contenedores Docker de manera gestionada, facilitando el escalado automático de la API según la demanda de los usuarios.

## 2. Frontend (React)
* **Servicio:** Amazon S3 combinado con Amazon CloudFront (CDN).
* **Justificación:** S3 almacena los archivos estáticos de forma económica, mientras que CloudFront distribuye el contenido globalmente para asegurar baja latencia y alta velocidad de carga.

## 3. Base de Datos (PostgreSQL)
* **Servicio:** Amazon RDS (Relational Database Service) para PostgreSQL.
* **Justificación:** Proporciona un entorno gestionado que incluye backups automáticos, parches de seguridad y alta disponibilidad (opción Multi-AZ).

## 4. Comunicación y Seguridad
* **AWS Certificate Manager (ACM):** Para gestionar certificados SSL/TLS y garantizar que toda la comunicación sea HTTPS.
* **Amazon VPC:** Para aislar los recursos de la base de datos en una subred privada, asegurando que solo el backend tenga acceso.