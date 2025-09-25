import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.model";
import { Driver } from "../../driver/models/driver.model";
import { MachineDriver } from "../../machine_driver/models/machine_driver.model";


interface IMachineAttributes {
  model: string;
  name: string;
  companyId: number;
}

@Table({ tableName: "machine", freezeTableName: true })
export class Machine extends Model<Machine, IMachineAttributes> {
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
    declare model: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare name: string;

    
    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
    })
    declare companyId: number;
    
    @BelongsTo(() => Company)
    company: Company;

    @BelongsToMany(() => Driver, () => MachineDriver)
    drivers: Driver[];
}
