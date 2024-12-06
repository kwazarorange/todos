import { randomUUID } from 'crypto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDTO } from './dto/createTodo.dto';
import { NotFoundError } from './errors/NotFound.error';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];

  create(todoDTO: CreateTodoDTO): Todo {
    const todo = { id: randomUUID(), completed: false, ...todoDTO };
    this.todos.unshift(todo);

    return todo;
  }

  delete(id: string) {
    const indexOfTodo = this.todos.findIndex((todo) => todo.id === id);
    if (indexOfTodo < 0)
      return new NotFoundError(HttpStatus.NOT_FOUND, 'No todo has been found');

    this.todos.splice(indexOfTodo, 1);
  }

  toggle(id: string, completed: boolean) {
    const indexOfTodo = this.todos.findIndex((todo) => todo.id === id);
    if (indexOfTodo < 0)
      return new NotFoundError(HttpStatus.NOT_FOUND, 'No todo has been found');

    this.todos[indexOfTodo].completed = completed;
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}
