import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente',
    type: Task,
  })
  @ApiResponse({ status: 400, description: 'Error de validación' })
  @ApiBody({ type: CreateTaskDto })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas obtenida exitosamente',
    type: [Task],
  })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea encontrada',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Completar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea completada exitosamente',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  complete(@Param('id') id: string): Task {
    return this.tasksService.complete(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({
    status: 204,
    description: 'Tarea eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  remove(@Param('id') id: string): void {
    return this.tasksService.remove(id);
  }
}
