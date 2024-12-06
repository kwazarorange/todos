import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDTO } from './dto/createTodo.dto';
import { NotFoundError } from './errors/NotFound.error';
import { ToggleTodo } from './dto/toggleTodo.dto';

@Controller('todo')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }

  @Post()
  create(@Body() CreateTodoDTO: CreateTodoDTO): Todo {
    return this.todoService.create(CreateTodoDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.todoService.delete(id);

    if (result instanceof NotFoundError) {
      throw new HttpException(
        {
          status: result.code,
          error: result.message,
        },
        result.code,
      );
    }
  }

  @Post(':id/toggle')
  toggle(@Param('id', ParseUUIDPipe) id: string, @Body() body: ToggleTodo) {
    const result = this.todoService.toggle(id, body.completed);

    if (result instanceof NotFoundError) {
      throw new HttpException(
        {
          status: result.code,
          error: result.message,
        },
        result.code,
      );
    }
  }
}
