import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Driver } from "../../driver/models/driver.model";
import { Machine } from "../../machine/models/machine.model";

interface IMachineDriverCreationAttr{
    machineId: number
    driverId:number
}

@Table({ tableName: "machine_driver" })
export class MachineDriver extends Model<
  MachineDriver,
  IMachineDriverCreationAttr
> {
  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
  })
  declare machineId: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
  })
  declare driverId: number;

  @BelongsTo(()=>Machine)
  machines:Machine

  @BelongsTo(()=>Driver)
  drivers:Driver

}
