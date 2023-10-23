import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { Skins } from 'src/skins/schemas/skins.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addBoughtSkin(id: string, skinId: string) {
    try {
      const userUpdated = await this.userModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          $push: {
            skins: new mongoose.Types.ObjectId(skinId),
          },
        },
        {
          new: true,
        },
      );
      
      return userUpdated.skins;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.userModel.find();
      return allUsers;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getMySkins(id: string) {
    try {
      const mySkins = await this.userModel
        .find({ _id: id })
        .select('skins')
        .populate({ path: 'skins', select: ['-__v'] })
        .lean();
      return mySkins;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async removeBoughtSkin(userId: string, skins: mongoose.Types.ObjectId[]) {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate({ _id: userId }, { skins: skins }).select('skins').populate({ path: 'skins' });
      return updatedUser.skins;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    return 'user removed';
  }
}
