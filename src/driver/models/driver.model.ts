import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface IDriverCreationAttr {
  first_name: string;
  last_name: string;
  phone: string;
  license: string;
}

@Table({ tableName: "driver", freezeTableName: true })
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
  declare first_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING(15),
    unique: true,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare license: string;
}
