import { Injectable, PipeTransform, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../user.service';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  
  async transform(data: CreateUserDto) {
    const { username, email } = data;

    const usernameExists = await this.userService.usernameExist(username);
    if (usernameExists)
      throw new ConflictException('this username is already taken');

    const emailExists = await this.userService.emailExist(email);
    if (emailExists) throw new ConflictException('this email is already taken');
    
    return data;
  }
}
