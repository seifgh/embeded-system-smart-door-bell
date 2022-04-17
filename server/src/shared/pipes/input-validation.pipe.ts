import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class InputValidationPipe implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (value) {
      const { metatype } = metadata;
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        throw new HttpException(
          {
            message: 'Input data validation failed',
            errors: this.buildError(errors),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return value;
  }
  private buildError(errors) {
    // {[field]: { [error]: [message] }}
    const result = {};
    errors.forEach((el) => {
      const propertyErrors = {};
      Object.entries(el.constraints).forEach(
        (constraint) => (propertyErrors[constraint[0]] = constraint[1]),
      );
      result[el.property] = propertyErrors;
    });
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
