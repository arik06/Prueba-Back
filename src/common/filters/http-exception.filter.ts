import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status: number;
    let message: string;
    let errors: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as { message?: string | string[]; error?: string };
        message = Array.isArray(responseObj.message)
          ? responseObj.message.join(', ')
          : responseObj.message || responseObj.error || 'Error desconocido';
        errors = responseObj;
      } else {
        message = 'Error desconocido';
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Error interno del servidor';
      this.logger.error(
        `Error no manejado: ${exception instanceof Error ? exception.message : String(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    this.logger.error(
      `HTTP ${status} Error: ${message} - Path: ${request.url} - Method: ${request.method}`,
    );

    response.status(status).send({
      statusCode: status,
      message,
      errors: errors || undefined,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
