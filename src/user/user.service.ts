import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { hashPassword } from 'src/utils/functions/password.function';
import { UpdateUserDto } from './dto/user.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: User) {
    try {
      user.password = await hashPassword(user.password);
      const initializeNewUser = new this.userModel(user);
      const createUser = await initializeNewUser.save();

      return {
        message: 'User created successfully',
        createUser,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      const updateUser = await this.userModel.findByIdAndUpdate(
        id,
        { ...user },
        { new: true },
      );

      if (!updateUser) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'Updated succesfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const deleteUser = await this.userModel.findByIdAndDelete(id);

      if (!deleteUser) {
        throw new NotFoundException('user not found');
      }

      return {
        message: 'User deleted successfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async emailExist(email: string) {
    try {
      return await this.propExist({ email });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async usernameExist(username: string) {
    try {
      return await this.propExist({ username });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async propExist(prop: FilterQuery<User>) {
    return await this.userModel.countDocuments(prop).then((count) => count > 0);
  }
}
