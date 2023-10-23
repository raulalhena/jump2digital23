import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkinsDto } from './dto/create-skins.dto';
import { UpdateSkinsDto } from './dto/update-skins.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skins } from './schemas/skins.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkinsService {
  constructor(@InjectModel(Skins.name) private skinsModel: Model<Skins>) {}

  create(createSkinsDto: CreateSkinsDto) {
    return 'This action adds a new skins';
  }

  async findSkinsAvailable() {
    try {
      const skinsAvailable = await this.skinsModel.find({ available: true });

      return skinsAvailable;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all skins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skins`;
  }

  update(id: number, updateSkinsDto: UpdateSkinsDto) {
    return `This action updates a #${id} skins`;
  }

  remove(id: number) {
    return `This action removes a #${id} skins`;
  }
}
