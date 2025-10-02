import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RoleService } from '../role/role.service';
import { Role } from '../role/models/role.model';
import { AddRemoveDto } from './dto/add-remove-role.dto';
import { ActiveUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly roleServise: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleServise.findRoleByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }
    const user = await this.userModel.create(createUserDto);
    // await user.$set("roles", [role.id]);
    return user;
  }

  findAll() {
    return this.userModel.findAll()
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return user?.dataValues;
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addRole(addRemoveRoleDto: AddRemoveDto) {
    const { userId, value } = addRemoveRoleDto;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Bunday role mavjud emas");
    }
    const role = await this.roleServise.findRoleByValue(value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    await user.$add("roles", [role.id]);
    const updatedUser = await this.userModel.findByPk(userId, {
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return updatedUser;
  }

  async removeRole(addRemoveRoleDto: AddRemoveDto) {
    const { userId, value } = addRemoveRoleDto;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Bunday role mavjud emas");
    }
    const role = await this.roleServise.findRoleByValue(value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    await user.$remove("roles", [role.id]);
    const updatedUser = await this.userModel.findByPk(userId, {
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return updatedUser;
  }


  async activeteUser(activeUserDto: ActiveUserDto){
    const { userId } = activeUserDto;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    user.is_active = true
    await user.save()
    return "User activeted"
  }
}
