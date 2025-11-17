import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Completar proyecto',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El título no puede exceder 100 caracteres' })
  title!: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Terminar la API de tareas con NestJS',
    minLength: 5,
    maxLength: 500,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description!: string;
}
