import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateUserPipe } from './pipes/user.pipe';
import { UserService } from './user.service';
import {
  createUserValidator,
  upadteUserValidator,
} from './validator/user.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(
    @Body(new JoiObjectValidationPipe(createUserValidator), CreateUserPipe)
    createUserDto: CreateUserDto,
  ) {
    return await this.userService.create(createUserDto);
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Patch('update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body(new JoiObjectValidationPipe(upadteUserValidator)) user: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, user);
  }
  
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
}
