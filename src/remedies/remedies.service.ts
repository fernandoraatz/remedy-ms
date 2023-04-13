import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRemedyDto } from './dtos/create-remedy.dto';
import { Remedy } from './entities/remedy.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateRemedyDto } from './dtos/update-remedy.dto';

@Injectable()
export class RemediesService {
  constructor(
    @Inject('REMEDY_REPOSITORY')
    private remedyRepository: Repository<Remedy>,
  ) {}

  findAll() {
    return this.remedyRepository.find();
  }

  async createRemedy(createRemedyDto: CreateRemedyDto): Promise<Remedy> {
    const remedy = this.remedyRepository.create({
      ...createRemedyDto,
    });

    try {
      await this.remedyRepository.save(remedy);

      return remedy;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o Remédio no banco de dados',
      );
    }
  }

  async findOne(id: string) {
    const remedy = await this.remedyRepository.findOne({
      where: { id },
    });

    if (!remedy) {
      throw new NotFoundException(`Remédio ID ${id} não encontrado`);
    }

    return remedy;
  }

  async remove(id: string) {
    const remedy = await this.remedyRepository.findOne({
      where: { id },
    });

    if (!remedy) {
      throw new NotFoundException(`Remédio ID ${id} não encontrado`);
    }

    return this.remedyRepository.remove(remedy);
  }

  async update(id: string, updateCourseDto: UpdateRemedyDto) {
    const remedy = await this.remedyRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!remedy) {
      throw new NotFoundException(`Remédio ID ${id} não encontrado`);
    }

    return this.remedyRepository.save(remedy);
  }
}
