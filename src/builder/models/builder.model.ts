import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Company } from "../../company/models/company.model";


interface IBuliderCrationAttr {
  full_name: string;
  brith_day: Date;
  salary: number;
  companyId: number;
}


@Table({ tableName: "builder" })
export class Builder extends Model<Builder, IBuliderCrationAttr> {
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
  declare full_name: string;

  @Column({
    type: DataType.DATEONLY,
  })
  declare brith_day: Date;

  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare salary: number;

  @ForeignKey(()=>Company)
  @Column({
    type: DataType.INTEGER,
  })
  declare companyId: number;

  @BelongsTo(()=>Company)
  company:Company;
}

