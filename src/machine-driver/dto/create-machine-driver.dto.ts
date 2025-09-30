import { IsInt, IsPassportNumber } from "class-validator";

export class CreateMachineDriverDto {
  @IsInt()
  machineId: number;
  @IsInt()
  driverId: number;
  
}
