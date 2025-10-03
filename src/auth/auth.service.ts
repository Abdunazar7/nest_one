import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { SinginUserDto } from '../users/dto/sing_user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtservice: JwtService
  ) {}

  private async genereteToken(user:User){
    const paylod = {
        id: user.id,
        email: user.email,
        roles: user.roles
    }
    return {token: this.jwtservice.sign(paylod)}
  }

  async singup(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(createUserDto.email);
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    createUserDto.password = hashedPassword;
    createUserDto.value = "user";

    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  async singin(singinUserDto: SinginUserDto) {
    const user = await this.usersService.findByEmail(singinUserDto.email);
    if (!user) {
        throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const confirmPassword = await bcrypt.compare(singinUserDto.password, user.password);
    if(!confirmPassword){
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }


    return this.genereteToken(user);
  }
}
