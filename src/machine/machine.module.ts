import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { Company } from '../company/models/company.model';

@Module({
  imports:[SequelizeModule.forFeature([Machine, Company])],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
