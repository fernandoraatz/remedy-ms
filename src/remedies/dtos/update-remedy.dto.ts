import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-remedy.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
