import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkinsDto } from './dto/create-skins.dto';
import { UpdateSkinsDto } from './dto/update-skins.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skins } from './schemas/skins.schema';
import { Model } from 'mongoose';
import { BuySkinDto } from './dto/buy-skin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SkinsService {
  constructor(
    @InjectModel(Skins.name) private skinsModel: Model<Skins>,
    private userService: UserService,
  ) {}

  async create(createSkinsDto: CreateSkinsDto) {
    try {
      const newSkin = await this.skinsModel.create(createSkinsDto);
      return newSkin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findSkinsAvailable() {
    try {
      const skinsAvailable = await this.skinsModel.find({ available: true });

      return skinsAvailable;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const skin = await this.skinsModel.findById(id);
      return skin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async buySkin(buySkinDto: BuySkinDto) {
    try {
      const skin = await this.skinsModel.findOne({
        _id: buySkinDto._id,
        available: true,
      });
      if (skin === undefined)
        throw new HttpException(
          'Skin is not available',
          HttpStatus.BAD_REQUEST,
        );
      this.userService.addBoughtSkin(buySkinDto.userId, buySkinDto._id);
      return skin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserSkins(id: string) {
    try {
      const userSkins = await this.userService.getMySkins(id);
      return userSkins;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateSkinsDto: UpdateSkinsDto) {
    return `This action updates a #${id} skins`;
  }

  remove(id: number) {
    return `This action removes a #${id} skins`;
  }
}
