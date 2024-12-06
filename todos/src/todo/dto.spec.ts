import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTodoDTO } from './dto/createTodo.dto';

describe('TodoController', () => {
  it('should succeed on correct value', async () => {
    const todoDTO: CreateTodoDTO = { value: 'lorem ipsum nova' };
    const todoDTOObject = plainToInstance(CreateTodoDTO, todoDTO);
    const errors = await validate(todoDTOObject);
    expect(errors.length).toBe(0);
  });

  it('should fail on empty value', async () => {
    const todoDTO: CreateTodoDTO = { value: '' };
    const todoDTOObject = plainToInstance(CreateTodoDTO, todoDTO);
    const errors = await validate(todoDTOObject);
    expect(errors.length).not.toBe(0);
  });

  it('should fail on value larger than 150 characters', async () => {
    const todoDTO: CreateTodoDTO = { value: '1'.repeat(151) };
    const todoDTOObject = plainToInstance(CreateTodoDTO, todoDTO);
    const errors = await validate(todoDTOObject);
    expect(errors.length).not.toBe(0);
  });
});
