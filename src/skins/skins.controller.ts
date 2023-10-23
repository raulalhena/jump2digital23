import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkinsService } from './skins.service';
import { CreateSkinsDto } from './dto/create-skins.dto';
import { UpdateSkinsDto } from './dto/update-skins.dto';
import { BuySkinDto } from './dto/buy-skin.dto';

@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @Post()
  create(@Body() createSkinsDto: CreateSkinsDto) {
    return this.skinsService.create(createSkinsDto);
  }

  @Get()
  skinsAvailable() {
    return this.skinsService.findSkinsAvailable();
  }

  @Get('getskin/:id')
  findOne(@Param('id') id: string) {
    return this.skinsService.findOne(id);
  }

  @Post('/buy')
  buySkin(@Body() buySkinDto: BuySkinDto) {
    return this.skinsService.buySkin(buySkinDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkinsDto: UpdateSkinsDto) {
    return this.skinsService.update(+id, updateSkinsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinsService.remove(+id);
  }
}
