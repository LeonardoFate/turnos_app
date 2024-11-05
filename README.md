
# Aplicación de Turnos

Este proyecto es una aplicación de turnos que permite gestionar y atender turnos en tiempo real. Está construida con un frontend en Angular 18, un backend en Spring Boot 3.3.5 con Java 21, y una base de datos MySQL containerizada en Docker.

## Diagrama de Arquitectura

![Diagrama](https://github.com/user-attachments/assets/3ffce0d9-cb2c-4e04-a6cb-9a891da4e7fb)


**Descripción del Diagrama**:
1. **Usuario** accede a la aplicación desde un navegador web y realiza solicitudes de turnos.
2. **Frontend** en Angular maneja la interfaz de usuario y envía solicitudes HTTP al backend.
3. **Backend** en Spring Boot recibe las solicitudes del frontend, procesa la lógica de negocio, y se comunica con la base de datos.
4. **Base de Datos** MySQL, containerizada en Docker, almacena los datos de los turnos y responde a las consultas realizadas por el backend.

## Tecnologías Utilizadas

- **Frontend**: Angular 18
- **Backend**: Spring Boot 3.3.5, Java 21
- **Base de Datos**: MySQL Dockerizada

## Requisitos Previos

1. Docker y Docker Compose instalados.
2. Node.js y Angular CLI instalados.

## Instalación y Ejecución

### Backend

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd backend
   ```

2. Construir y ejecutar el contenedor Docker:
   ```bash
   docker-compose up --build
   ```

### Frontend

1. Instalar las dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Ejecutar el servidor Angular:
   ```bash
   ng serve
   ```

3. Acceder a la aplicación en [http://localhost:4200](http://localhost:4200).

## Funcionalidades Clave

- **Registro de Turnos**: Permite al usuario crear un nuevo turno a través de la interfaz web.
- **Cola de Turnos**: Muestra los turnos en el orden en que fueron solicitados.
- **Atención de Turnos**: Permite avanzar al siguiente turno en la cola y actualizar el estado de cada turno.


## Contacto

Para consultas o soporte adicional, contacta a [tu-email@dominio.com](mailto:tu-email@dominio.com).
