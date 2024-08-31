import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(client);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const clients = await this.clientRepository.find({
      order: { fechaCreacion: 'DESC' },
      where: { is_Active: true },
    });
    return clients;
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);

    Object.assign(client, updateClientDto);

    return await this.clientRepository.save(client);
  }

  async remove(id: string) {
    const client = await this.findOne(id);

    client.is_Active = false;

    await this.clientRepository.save(client);

    return {
      message: 'Usuario eliminado correctamente',
    };
  }
}
