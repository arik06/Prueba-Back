import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    this.logger.log(`Creando nueva tarea: ${createTaskDto.title}`);

    const newTask = new Task({
      id: this.idCounter.toString(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.idCounter++;
    this.tasks.push(newTask);

    this.logger.log(`Tarea creada exitosamente con ID: ${newTask.id}`);
    return newTask;
  }

  findAll(): Task[] {
    this.logger.log('Obteniendo todas las tareas');
    return this.tasks;
  }

  findOne(id: string): Task {
    this.logger.log(`Buscando tarea con ID: ${id}`);
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      this.logger.warn(`Tarea con ID ${id} no encontrada`);
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }

    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    this.logger.log(`Actualizando tarea con ID: ${id}`);
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      this.logger.warn(`Tarea con ID ${id} no encontrada para actualizar`);
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = new Task(updatedTask);
    this.logger.log(`Tarea con ID ${id} actualizada exitosamente`);
    return this.tasks[taskIndex];
  }

  complete(id: string): Task {
    this.logger.log(`Completando tarea con ID: ${id}`);
    return this.update(id, { completed: true });
  }

  remove(id: string): void {
    this.logger.log(`Eliminando tarea con ID: ${id}`);
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      this.logger.warn(`Tarea con ID ${id} no encontrada para eliminar`);
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }

    this.tasks.splice(taskIndex, 1);
    this.logger.log(`Tarea con ID ${id} eliminada exitosamente`);
  }
}