import { Injectable } from "@nestjs/common";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { Driver } from "./models/driver.model";
import { InjectModel } from "@nestjs/sequelize";


@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private readonly driverModel: typeof Driver
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const newDriver = await this.driverModel.create(createDriverDto);
    return newDriver;
  }

  findAll() {
    return this.driverModel.findAll({include: { all: true }});
  }

  findOne(id: number) {
    return this.driverModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverModel.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return driver[1][0];
  }

  async remove(id: number) {
    const delCount = await this.driverModel.destroy({ where: { id } });
    if (delCount === 0) {
      return { message: "No driver found to delete." };
    }
    return { message: "Driver deleted successfully.", id };
  }
}
