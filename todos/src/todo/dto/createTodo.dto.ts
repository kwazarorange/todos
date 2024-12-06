import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  value: string;
}
