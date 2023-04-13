import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dtos/create-remedy.dto';
import { Place } from './entities/remedy.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdatePlaceDto } from './dtos/update-remedy.dto';

@Injectable()
export class RemediesService {
  constructor(
    @Inject('REMEDY_REPOSITORY')
    private placeRepository: Repository<Place>,
  ) {}

  findAll() {
    return this.placeRepository.find();
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create({
      ...createPlaceDto,
    });

    try {
      await this.placeRepository.save(place);

      return place;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o estabelecimento no banco de dados',
      );
    }
  }

  async findOne(id: string) {
    const place = await this.placeRepository.findOne({
      where: { id },
    });

    if (!place) {
      throw new NotFoundException(`Remédio ID ${id} não encontrado`);
    }

    return place;
  }

  async remove(id: string) {
    const place = await this.placeRepository.findOne({
      where: { id },
    });

    if (!place) {
      throw new NotFoundException(`Remédio ID ${id} não encontrado`);
    }

    return this.placeRepository.remove(place);
  }

  async update(id: string, updateCourseDto: UpdatePlaceDto) {
    const place = await this.placeRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!place) {
      throw new NotFoundException(`Remédio ID ${id} não encontrado`);
    }

    return this.placeRepository.save(place);
  }
}
