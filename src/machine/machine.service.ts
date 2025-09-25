import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { Company } from '../company/models/company.model';

@Injectable()
export class MachineService {

  constructor(
    @InjectModel(Machine) private readonly machineModel: typeof Machine,
    @InjectModel(Company) private readonly companyModel: typeof Company,
  ){}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const { companyId } = createMachineDto;
    const company = await this.companyModel.findByPk(companyId);
    if (!company) {
      throw new Error(`Company with id ${companyId} does not exist.`);
    }
    const newMachine = await this.machineModel.create(createMachineDto);
    return newMachine;
  }

  findAll() {
    return this.machineModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const machine = await this.machineModel.findByPk(id, {
      include: { all: true },
    });
    if (!machine) return { message: `Machine ${id} not found` };
    return machine;
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const result = await this.machineModel.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    return result[1][0];
  }

  async remove(id: number) {
    const delCount = await this.machineModel.destroy({ where: { id } });
    if (delCount === 0) {
      return { message: "No machine found to delete." };
    }
    return { message: "Machine deleted successfully.", id };
  }
}
