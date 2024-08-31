import { IsEnum, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { EstadoCivil } from "../intefaces/estado-civil.enum";

export class CreateClientDto {
  @IsNumber()
  @Min(1, {
    message: 'La edad no puede ser menor a 1'
  })
  @Max(99, {
    message: 'La edad no puede ser mayor a 99'
  })
  edad: number;

  @IsString()
  @MinLength(4, {
    message: 'El nombre no puede ser tan corto',
  })
  @MaxLength(80, {
    message: 'El nombre no puede ser tan largo'
  })
  nombre: string;

  @IsEnum(EstadoCivil, {message: 'Estado civil no valido'})
  estadoCivil: EstadoCivil;

  @IsString()
  @MinLength(4, {
    message: 'La dirección es muy corta',
  })
  @MaxLength(50,{
    message: 'La dirección es muy larga',
  })
  direccion: string;

  @IsString()
  @IsOptional()
  @MinLength(4,{
    message: 'Los antecedentes son demasiado cortos'
  })
  @MaxLength(500, {
    message: 'Los antecedentes son demasiado largos'
  })
  antecedentes: string;

  @IsString()
  @IsOptional()
  @MinLength(4,{
    message: 'Los antecedentes heredofamiliares son demasiado cortos'
  })
  @MaxLength(500, {
    message: 'Los antecedentes heredofamiliares son demasiado largos'
  })
  antecedentesHeredoFamiliares: string;

  @IsString()
  @MinLength(4, {
    message: 'La exploración física es demasiado corta'
  })
  @MaxLength(500, {
    message: 'La exploración física es demasiado larga'
  })
  exploracionFisica: string;

  @IsString()
  @IsOptional()
  organosYSistemas: string;

  @IsString()
  motivoDeLaVisita: string;

  @IsString()
  @MinLength(4, {
    message: 'El diagnostico es demasiado corto'
  })
  @MaxLength(500, {
    message: 'El diagnostico es demasiado largo'
  })
  diagnostico: string;

  @IsString()
  @MinLength(4, {
    message: 'El tratamiento es demasiado corto'
  })
  @MaxLength(500, {
    message: 'El tratamiento es demasiado largo'
  })
  tratamiento: string;
}
