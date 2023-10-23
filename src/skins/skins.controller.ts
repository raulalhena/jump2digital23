import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put
} from '@nestjs/common';
import { SkinsService } from './skins.service';
import { CreateSkinsDto } from './dto/create-skins.dto';
import { UpdateSkinsDto } from './dto/update-skins.dto';
import { BuySkinDto } from './dto/buy-skin.dto';
import { DeleteSkinDto } from './dto/delete-skin.dto';

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

  @Get('myskins')
  getMySkins(@Query('id') id: string) {
    return this.skinsService.getUserSkins(id);
  }

  @Post('/buy')
  buySkin(@Body() buySkinDto: BuySkinDto) {
    return this.skinsService.buySkin(buySkinDto);
  }

  @Put('color')
  changeSkinColor(@Body() updateSkinsDto: UpdateSkinsDto) {
    return this.skinsService.changeSkinColor(updateSkinsDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Body() deleteSkinDto: DeleteSkinDto) {
    return this.skinsService.remove(id, deleteSkinDto);
  }
}
