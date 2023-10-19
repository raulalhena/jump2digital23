import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skin } from './schemas/skin.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkinService {

  constructor(@InjectModel(Skin.name) private skinModel: Model<Skin>) {}

  create(createSkinDto: CreateSkinDto) {
    return 'This action adds a new skin';
  }

  async findSkinsAvailable() {
    try {
      const skinsAvailable = await this.skinModel.find({ available: true });

      return skinsAvailable;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all skin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skin`;
  }

  update(id: number, updateSkinDto: UpdateSkinDto) {
    return `This action updates a #${id} skin`;
  }

  remove(id: number) {
    return `This action removes a #${id} skin`;
  }
}
