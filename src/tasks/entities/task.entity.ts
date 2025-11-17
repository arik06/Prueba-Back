import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ description: 'ID único de la tarea', example: '1' })
  id: string;

  @ApiProperty({ description: 'Título de la tarea', example: 'Completar proyecto' })
  title: string;

  @ApiProperty({ description: 'Descripción de la tarea', example: 'Terminar la API de tareas' })
  description: string;

  @ApiProperty({ description: 'Estado de completado', example: false })
  completed: boolean;

  @ApiProperty({ description: 'Fecha de creación', example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
