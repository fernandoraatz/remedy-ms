import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreatePlaceDto } from './dtos/create-remedy.dto';
import { RemediesService } from './remedies.service';
import { ReturnPlaceDto } from './dtos/return-remedy.dto';
import { UpdatePlaceDto } from './dtos/update-remedy.dto';

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
  update(@Param('id') id: string, @Body() updateCourseDto: UpdatePlaceDto) {
    return this.remediesService.update(id, updateCourseDto);
  }

  @Post()
  async createPlace(
    @Body() createPlaceDto: CreatePlaceDto,
  ): Promise<ReturnPlaceDto> {
    const place = await this.remediesService.createPlace(createPlaceDto);

    return {
      place,
      message: 'Remédio cadastrado com sucesso',
    };
  }
}
