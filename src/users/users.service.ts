import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/users.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Remedy } from '../remedies/entities/remedy.entity';
import { CreateUserRemedyDto } from './dtos/create-userRemedy.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('REMEDY_REPOSITORY')
    private remedyRepository: Repository<Remedy>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
    });

    try {
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário ID ${id} não encontrado`);
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário ID ${id} não encontrado`);
    }

    return this.userRepository.remove(user);
  }

  async update(id: string, updateCourseDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!user) {
      throw new NotFoundException(`Usuário ID ${id} não encontrado`);
    }

    return this.userRepository.save(user);
  }

  async createUserRemedy(
    createUserRemedyDto: CreateUserRemedyDto,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: createUserRemedyDto.userId },
    });

    console.log(
      'createUserRemedyDto.remedyID :>> ',
      createUserRemedyDto.remedyId,
    );

    const remedy = await this.remedyRepository.findOne({
      where: { id: createUserRemedyDto.remedyId },
    });

    console.log('remedy :>> ', remedy);

    user.remedies = [...user.remedies, remedy];

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log('error :>> ', error);
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }
}
