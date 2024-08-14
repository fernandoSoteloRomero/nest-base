import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: "El nombre debe ser mayor a 2 caracteres."
  })
  names: string;

  @IsString()
  @MinLength(10, {
    message: "El usuario debe ser mayor a 10 caracteres."
  })
  username: string;

  @IsString()
  @MinLength(2, {
    message: "El primer apellido debe ser mayor a 2 caracteres."
  })
  first_name: string;

  @IsString()
  @MinLength(2, {
    message: "El segundo apellido debe ser mayor a 2 caracteres."
  })
  last_name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener Mayusculas, minusculas y un número.',
  })
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  roles?: string[];
}
