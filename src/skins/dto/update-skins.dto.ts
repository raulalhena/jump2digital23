import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinsDto } from './create-skins.dto';
export class UpdateSkinsDto extends PartialType(CreateSkinsDto) {}
