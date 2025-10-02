import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SinginUserDto } from '../users/dto/sing_user.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  singup(@Body() createUserDto: CreateUserDto) {
    return this.authService.singup(createUserDto);
  }

  @Post("signin")
  singin(@Body() siningUserDto: SinginUserDto) {
    return this.authService.singin(siningUserDto);
  }
}
