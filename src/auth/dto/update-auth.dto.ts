import { CreateUserDto } from './create-auth.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAuthDto extends PartialType(CreateUserDto) {}
