import { HttpStatus } from '@nestjs/common';

export class NotFoundError {
  code: HttpStatus;
  message: string;

  constructor(code: HttpStatus, message: string) {
    this.code = code;
    this.message = message;
  }
}
