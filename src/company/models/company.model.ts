import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Builder } from "../../builder/models/builder.model";

interface ICompanyCreationAttr {
  name: string;
  email: string;
  address: string;
  phone: string;
}

@Table({ tableName: "company", freezeTableName: true })
export class Company extends Model<Company, ICompanyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
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

  @HasMany(() => Builder)
  builders: Builder[];
}
