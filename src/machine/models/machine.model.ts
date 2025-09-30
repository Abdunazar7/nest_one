import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Company } from "../../company/models/company.model";
import { Driver } from "../../driver/models/driver.model";
import { MachineDriver } from "../../machine-driver/models/machine-driver.model";

interface IMachineCreation{
    model:string
    name:string
    companyId: number
}

@Table({tableName:"machine"})
export class Machine extends Model<Machine, IMachineCreation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare model: string;

  @Column({
    type:DataType.STRING(50)
  })
  name: string;

  @ForeignKey(()=>Company)
  @Column({
    type:DataType.INTEGER
  })
  companyId: number;

  @BelongsTo(()=>Company)
  company:Company;

  @BelongsToMany(()=>Driver, ()=>MachineDriver)
  drivers:Driver[]

}
