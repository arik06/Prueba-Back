import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Título de la tarea',
    example: 'Completar proyecto actualizado',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El título no puede exceder 100 caracteres' })
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la tarea',
    example: 'Terminar la API de tareas con NestJS y Fastify',
    minLength: 5,
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado de completado',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo completed debe ser un booleano' })
  completed?: boolean;
}