import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation pipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar Swagger
  setupSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
  logger.log(`🚀 Aplicación corriendo en: ${baseUrl}`);
  logger.log(`📚 Documentación Swagger: ${baseUrl}/api/docs`);
}

bootstrap();