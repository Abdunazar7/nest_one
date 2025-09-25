import { Module } from "@nestjs/common";
import { MachineDriverService } from "./machine_driver.service";
import { MachineDriverController } from "./machine_driver.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Driver } from "../driver/models/driver.model";
import { Machine } from "../machine/models/machine.model";
import { MachineDriver } from "./models/machine_driver.model";

@Module({
  imports: [SequelizeModule.forFeature([Driver, Machine, MachineDriver])], // <-- add MachineDriver here
  controllers: [MachineDriverController],
  providers: [MachineDriverService],
  exports: [MachineDriverService], // optional, if other modules need it
})
export class MachineDriverModule {}
