import { Body, Controller, Post } from '@nestjs/common';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { CreateUserDto } from './dto/user.dto';
import { CreateUserPipe } from './pipes/user.pipe';
import { UserService } from './user.service';
import { createUserValidator } from './validator/user.validator';

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
}
