import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoCivil } from '../intefaces/estado-civil.enum';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  edad: number;

  @Column({
    type: 'text',
  })
  nombre: string;

  @Column({
    type: 'enum',
    enum: EstadoCivil,
  })
  estadoCivil: EstadoCivil;

  @Column({
    type: 'text',
  })
  direccion: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  antecedentes: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  antecedentesHeredoFamiliares: string;

  @Column({ type: 'text' })
  exploracionFisica: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  organosYSistemas: string;

  @Column({
    type: 'text',
  })
  motivoDeLaVisita: string;

  @Column({ type: 'text' })
  diagnostico: string;

  @Column({
    type: 'text',
  })
  tratamiento: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fechaActualizacion: Date;

  @Column({
    type: 'bool',
    default: true,
  })
  is_Active: boolean;
}
