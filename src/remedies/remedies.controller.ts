import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateRemedyDto } from './dtos/create-remedy.dto';
import { RemediesService } from './remedies.service';
import { ReturnRemedyDto } from './dtos/return-remedy.dto';
import { UpdateRemedyDto } from './dtos/update-remedy.dto';

@Controller('remedies')
export class RemediesController {
  constructor(private remediesService: RemediesService) {}

  @Get()
  findAll() {
    return this.remediesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remediesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remediesService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateRemedyDto) {
    return this.remediesService.update(id, updateCourseDto);
  }

  @Post()
  async createRemedy(
    @Body() createRemedyDto: CreateRemedyDto,
  ): Promise<ReturnRemedyDto> {
    const remedy = await this.remediesService.createRemedy(createRemedyDto);

    return {
      remedy,
      message: 'Remédio cadastrado com sucesso',
    };
  }
}
