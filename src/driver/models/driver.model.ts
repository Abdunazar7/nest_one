import { AutoIncrement, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { MachineDriver } from "../../machine-driver/models/machine-driver.model"
import { Machine } from "../../machine/models/machine.model"

interface IDriverCreationAttr{
    frist_name: string
    last_name: string
    phone:string
    driver_litsenc:string
    image: any
}

@Table({ tableName: "driver" })
export class Driver extends Model<Driver, IDriverCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  frist_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(13),
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  driver_litsenc: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @BelongsToMany(()=>Machine, ()=>MachineDriver)
  machines:Machine[]
}
