import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Pais } from 'src/paises/entities/pais.entity';

export class CreateSerieDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo titulo es obligatorio' })
  @IsString({ message: 'El campo titulo debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo titulo no debe exceder los 250 caracteres',
  })
  readonly titulo: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo id_pais debe estar definido' })
  @IsInt({ message: 'El campo id_pais debe ser de tipo numérico' })
  readonly id_pais: Pais['id'];

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sinopsis es obligatorio' })
  @IsString({ message: 'El campo sinopsis debe ser de tipo cadena' })
  @MaxLength(5000, {
    message: 'El campo sinopsis no debe exceder los 5000 caracteres',
  })
  readonly sinopsis: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo director es obligatorio' })
  @IsString({ message: 'El campo director debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo director no debe exceder los 100 caracteres',
  })
  readonly director: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo temporadas es obligatorio' })
  @IsInt({ message: 'El campo temporadas debe ser de tipo numérico' })
  readonly temporadas: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha de estreno debe estar definido' })
  readonly fecha_estreno: Date;
}
