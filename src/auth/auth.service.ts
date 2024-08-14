import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      // Aun no se guarda en base de datos, se crea solo la instancia
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });

      // Aqui ya se guardan los datos en la base de datos
      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          fullName: user.names,
          roles: user.roles,
        }),
      };
    } catch (err) {
      this.handleErrors(err);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { username },
      select: {
        username: true,
        password: true,
        id: true,
        names: true,
        roles: true,
      },
    });

    if (!user)
      throw new UnauthorizedException(`Usuario o contraseña incorrecto`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Usuario o contraseña incorrecto`);

    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        fullName: user.names,
        roles: user.roles,
      }),
    };
  }

  async findUserById(id: string): Promise<User> {
    let user: User;
    try {
      if (validate(id)) {
        user = await this.userRepository.findOneBy({ id });
      }
      return user;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  checkAuthStatus(user: User) {
    try {
      return {
        user,
        token: this.getJwtToken({
          id: user.id,
          fullName: user.names,
          roles: user.roles,
        }),
      };
    } catch (err) {
      this.handleErrors(err);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.names'])
        .where('user.roles = :role', { role: ['user'] })
        .getMany();

      return users;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(err: any) {
    if (err.code === '23505') throw new BadRequestException(`${err.detail}`);

    console.log(err);

    throw new InternalServerErrorException('Verificar los logs del servidor.');
  }
}
