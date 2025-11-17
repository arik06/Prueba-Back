import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check - Verificar que la API está funcionando' })
  @ApiResponse({
    status: 200,
    description: 'API funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'API de Tareas está funcionando correctamente' },
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-11-17T02:29:46.000Z' },
      },
    },
  })
  getHealthCheck(): { message: string; status: string; timestamp: string } {
    return {
      message: 'API de Tareas está funcionando correctamente',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
