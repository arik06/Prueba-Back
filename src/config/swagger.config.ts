import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const servers: string[] = [];
  
 
  if (process.env.RENDER_EXTERNAL_URL) {
    servers.push(process.env.RENDER_EXTERNAL_URL);
  }
  
  
  servers.push('http://localhost:3000');

  const config = new DocumentBuilder()
    .setTitle('API de Tareas')
    .setDescription('API REST para gestión de tareas construida con NestJS y Fastify')
    .setVersion('1.0')
    .addTag('tasks', 'Endpoints relacionados con tareas');
  
  
  servers.forEach((server, index) => {
    const serverName = index === 0 && process.env.RENDER_EXTERNAL_URL 
      ? 'Servidor de producción' 
      : 'Servidor de desarrollo';
    config.addServer(server, serverName);
  });

  const builtConfig = config.build();

  const document = SwaggerModule.createDocument(app, builtConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'API de Tareas - Documentación',
  });
}