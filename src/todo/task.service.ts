import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
    _tasks: TaskModel[] = [
        {id : 1, description: "Feed the cat" },
        {id : 2, description: "Clean te windows" },
        {id : 3, description: "Finish recording youtube video" },

    ]

    findAllTasks(): TaskModel[] {
        return this._tasks;
    }

    findByTaskId(id: number): TaskModel {
        return this._tasks.find(t => t.id == id);
    }

    postTask(createTaskDto: TaskModel): TaskModel {
          const newTask: TaskModel = {
            id: this._tasks.length + 1,
            description: createTaskDto.description,
            is_complete: createTaskDto.is_complete,
          };
        console.log(newTask)
        this._tasks.push(newTask);
        return newTask;
      }

    updateTask(updateTaskDto: TaskModel, id: number): TaskModel {
        const taskIndex = this._tasks.findIndex(t => t.id == id);
        console.log(this._tasks);

        if (taskIndex === -1) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        
        this._tasks[taskIndex] = {
            ...this._tasks[taskIndex],
            description: updateTaskDto.description,
            is_complete: updateTaskDto.is_complete !== undefined ? updateTaskDto.is_complete : this._tasks[taskIndex].is_complete,
          };
        
          return this._tasks[taskIndex];
    }

    deleteTask(id: number): boolean {
        const taskIndex = this._tasks.findIndex(t => t.id == id);
        if (taskIndex === -1) {
            return false;
        }
        this._tasks.splice(taskIndex, 1);
        return true;

    }
    
}
