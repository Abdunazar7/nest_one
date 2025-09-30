import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Builder } from "../../builder/models/builder.model"
import { Machine } from "../../machine/models/machine.model"

interface ICompanyCreationAttr{
    name:string
    email:string
    address:string
    phone:string
}

@Table({ tableName: "company" })
export class Company extends Model<Company, ICompanyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    type: DataType.STRING(15),
    unique: true,
  })
  declare phone: string;

  @HasMany(()=> Builder)
  buildres: Builder[]

  @HasMany(()=>Machine)
  machines:Machine[]
}
