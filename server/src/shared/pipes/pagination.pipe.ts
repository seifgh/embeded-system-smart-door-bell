import { PipeTransform } from '@nestjs/common';

export class PaginationLimitValuePipe implements PipeTransform {
  constructor(private readonly maxLimit: number = 30) {}
  transform(value: number) {
    return value > this.maxLimit ? this.maxLimit : value;
  }
}
