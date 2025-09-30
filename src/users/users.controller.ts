import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRemoveDto } from './dto/add-remove-role.dto';
import { ActiveUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.auth';
import { SelfGuard } from '../common/guards/self.guard';

@ApiTags("Users - Foydalanuvchilar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Foydalanuvchi qoshish",
  })
  @ApiResponse({
    status: 201,
    description: "yangi qoshilgan foydalanuvchi",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("add-role")
  @HttpCode(200)
  addRole(@Body() addRemoveRoleDto: AddRemoveDto) {
    return this.usersService.addRole(addRemoveRoleDto);
  }

  @Post("remove-role")
  @HttpCode(202)
  removeRole(@Body() addRemoveRoleDto: AddRemoveDto) {
    return this.usersService.removeRole(addRemoveRoleDto);
  }

  @Post("activate")
  @HttpCode(HttpStatus.OK)
  activate(@Body() activeUserDto: ActiveUserDto) {
    return this.usersService.activeteUser(activeUserDto);
  }

  @ApiOperation({
    summary: "Foydalanuvchi royxati",
  })
  @ApiResponse({
    status: 200,
    description: "foydalanuvhcilar royxati",
    type: [User],
  })

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("email/:email")
  findUserByEmail(@Param("email") email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
