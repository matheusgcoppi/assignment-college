import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskModel } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    getTasks() {
        return this.taskService.findAllTasks();
    }

    @Get(':taskId')
    getTaskById(@Param('taskId') id: number) {
        let task = this.taskService.findByTaskId(id);

        if (!task) {
            throw new NotFoundException(`task with Id ${id} not found.`)
        }

        return task;
    }

    @Post()
    postTask(@Body() createTaskDto: TaskModel) {
        console.log('Request Body:', createTaskDto);
        if (createTaskDto.description == null ||
            createTaskDto.description === undefined ||
            createTaskDto.description === "") {
            throw new HttpException('Description is required', HttpStatus.BAD_REQUEST);
        }

        if (createTaskDto.is_complete === undefined) {
            createTaskDto.is_complete = false;
        }

        if (typeof createTaskDto.is_complete !== 'boolean') {
            console.log(createTaskDto.is_complete)
            throw new HttpException('is_complete must be a boolean', HttpStatus.BAD_REQUEST);
        }

        return this.taskService.postTask(createTaskDto);
    }

    @Put(':id')
    updateTask(@Param('id') id: number, @Body() updateTaskDto: TaskModel) {
        const updatedTask = this.taskService.updateTask(updateTaskDto, id);
        return updatedTask;
    }


}
