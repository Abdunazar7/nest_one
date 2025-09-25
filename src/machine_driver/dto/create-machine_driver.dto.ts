import { IsInt, IsNumber } from "class-validator";

export class CreateMachineDriverDto {
  @IsInt()
  machineId: number;
  @IsInt()
  driverId: number;
}
