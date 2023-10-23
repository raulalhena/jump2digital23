import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkinsDto } from './dto/create-skins.dto';
import { UpdateSkinsDto } from './dto/update-skins.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skins } from './schemas/skins.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { BuySkinDto } from './dto/buy-skin.dto';
import { UserService } from 'src/user/user.service';
import { DeleteSkinDto } from './dto/delete-skin.dto';

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

      const skin = await this.skinsModel.findOne({ _id: buySkinDto._id, available: true });

      if (!skin) throw new HttpException('Skin is not available', HttpStatus.BAD_REQUEST);

      const skins = await this.userService.addBoughtSkin(buySkinDto.userId, buySkinDto._id);

      if(!this.isOwned(skins, String(skin._id))) throw new HttpException('Error while buying skin', HttpStatus.INTERNAL_SERVER_ERROR);

      const updatedSkin = await this.skinsModel.findOneAndUpdate(
        { _id: skin._id },
        { available: false },
        { new: true },
      );

      return updatedSkin;
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

  async remove(id: string, deleteSkinDto: DeleteSkinDto) {
    try {
      const [ { skins } ]  = await this.userService.getMySkins(deleteSkinDto.userId);

      skins.map((skin, index) => {
        if(String(skin._id) === String(id)) skins.splice(index, 1);
      });

      const updatedSkins = await this.userService.removeBoughtSkin(deleteSkinDto.userId, skins);

      if(this.isNotOwned(updatedSkins, id)) throw new HttpException('Error while removing skin', HttpStatus.INTERNAL_SERVER_ERROR);

      const updatedSkin = await this.skinsModel.findOneAndUpdate({ _id: id }, { available: true }, { new: true });

      return updatedSkin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  isOwned(skins: mongoose.Types.ObjectId[], skinId: string){
    let isOwned = false;
    skins.forEach((boughtSkin) => {
      if (String(boughtSkin._id) === skinId) isOwned = true;
    });

    return isOwned;
  }

  isNotOwned(skins: mongoose.Types.ObjectId[], skinId: string){
    let isOwned = true;
    skins.forEach((boughtSkin) => {
      if (String(boughtSkin._id) === skinId) isOwned = false;
    });

    return isOwned;
  }
}
