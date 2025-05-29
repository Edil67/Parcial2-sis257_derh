import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Pais } from '../entities/pais.entity';

export class CreatePaisDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo descripcion no debe exceder los 30 caracteres',
  })
  readonly descripcion: string;
}
