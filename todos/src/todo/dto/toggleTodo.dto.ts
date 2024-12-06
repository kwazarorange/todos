import { IsBoolean } from 'class-validator';

export class ToggleTodo {
  @IsBoolean()
  completed: boolean;
}
