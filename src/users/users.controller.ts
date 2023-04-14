import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserRemedyDto } from './dtos/create-userRemedy.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateUserDto) {
    return this.usersService.update(id, updateCourseDto);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);

    return {
      user,
      message: 'Usuário cadastrado com sucesso',
    };
  }

  // @Post('/remedies')
  // async createUserRemedies(
  //   @Body() createUserRemedyDto: CreateUserRemedyDto,
  // ): Promise<any> {
  //   const user = await this.usersService.createUserRemedy(createUserRemedyDto);

  //   return {
  //     user,
  //     message: 'Usuário cadastrado com sucesso',
  //   };
  // }
}
