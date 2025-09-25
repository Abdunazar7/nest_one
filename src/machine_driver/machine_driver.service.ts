import { Injectable } from '@nestjs/common';
import { CreateMachineDriverDto } from './dto/create-machine_driver.dto';
import { UpdateMachineDriverDto } from './dto/update-machine_driver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine_driver.model';

@Injectable()
export class MachineDriverService {
  constructor(
    @InjectModel(MachineDriver)
    private readonly machineDriverModel: typeof MachineDriver
  ) {}

  async create(
    createMachineDriverDto: CreateMachineDriverDto
  ): Promise<MachineDriver> {
    return this.machineDriverModel.create(createMachineDriverDto);
  }

  async findAll(): Promise<MachineDriver[]> {
    return this.machineDriverModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<MachineDriver | null> {
    return this.machineDriverModel.findByPk(id, { include: {all: true} });
  }

  async update(
    id: number,
    updateMachineDriverDto: UpdateMachineDriverDto
  ): Promise<[number]> {
    return this.machineDriverModel.update(updateMachineDriverDto, {
      where: { id },
    });
  }

  async remove(id: number): Promise<number> {
    return this.machineDriverModel.destroy({ where: { id } });
  }
}
