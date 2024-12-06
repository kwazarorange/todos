import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/createTodo.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should add todo', () => {
    const todoDTO: CreateTodoDTO = { value: 'test' };

    controller.create(todoDTO);

    expect(controller.getTodos().length).toBe(1);
  });

  it('should delete todo', () => {
    const todoDTO: CreateTodoDTO = { value: 'test' };

    controller.create(todoDTO);
    controller.remove(controller.getTodos()[0].id);

    expect(controller.getTodos().length).toBe(0);
  });

  it('should throw error if deleting non existing todo', () => {
    try {
      controller.remove('1');
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should check todo', () => {
    const todoDTO: CreateTodoDTO = { value: 'test' };

    controller.create(todoDTO);
    controller.toggle(controller.getTodos()[0].id, { completed: true });

    expect(controller.getTodos()[0].completed).toBe(true);
  });

  it('should uncheck todo', () => {
    const todoDTO: CreateTodoDTO = { value: 'test' };

    controller.create(todoDTO);
    controller.toggle(controller.getTodos()[0].id, { completed: true });
    controller.toggle(controller.getTodos()[0].id, { completed: false });

    expect(controller.getTodos()[0].completed).toBe(false);
  });
});
