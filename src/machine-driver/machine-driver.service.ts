import { Injectable } from '@nestjs/common';
import { CreateMachineDriverDto } from './dto/create-machine-driver.dto';
import { UpdateMachineDriverDto } from './dto/update-machine-driver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine-driver.model';

@Injectable()
export class MachineDriverService {
  constructor(
    @InjectModel(MachineDriver) private readonly machineDriverModel: typeof MachineDriver
  ) {}

  async create(createMachineDriverDto: CreateMachineDriverDto) {
    const machine = await this.machineDriverModel.create(createMachineDriverDto);
    return machine;
  }

  findAll() {
    return this.machineDriverModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return `This action returns a #${id} machineDriver`;
  }

  update(id: number, updateMachineDriverDto: UpdateMachineDriverDto) {
    return `This action updates a #${id} machineDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} machineDriver`;
  }
}
