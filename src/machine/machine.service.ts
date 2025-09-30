import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine) private readonly machineModel: typeof Machine
  ) {}

  async create(createMachineDto: CreateMachineDto) {
    const machine = await this.machineModel.create(createMachineDto)
    return machine
  }

  async findAll() {
    const machine = await this.machineModel.findAll({include:{all:true}})
    if(machine.length === 0){
      return "malimot hali yoq"
    }
    return machine
  }

  async findOne(id: number) {
    const machine = await this.machineModel.findByPk(id)
    if(!machine){
      return "Machine mavjud emas"
    }
    return machine
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const machine = await this.machineModel.findByPk(id);
    if (!machine) {
      return "Machine mavjud emas";
    }
    const updateMachine = await this.machineModel.update(updateMachineDto, {where:{id}, returning:true})
    return updateMachine[1][0]
  }

  async remove(id: number) {
   const delCount = await this.machineModel.destroy({ where: { id } });
   if (!delCount) {
     return { message: "Bunday machine mavjud emas" };
   }
   return { message: "machine ochrildi", id };
  }
}
