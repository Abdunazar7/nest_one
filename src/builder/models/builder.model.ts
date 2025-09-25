import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import {
    Column,
    DataType,
    Table,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.model";

interface IBuilderAttributes {
    full_name: string;
    birth_date: Date;
    salary: number;
}

@Table({ tableName: "builder", freezeTableName: true })
export class Builder extends Model<Builder, IBuilderAttributes> {
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
        allowNull: false,
    })
    declare birth_date: Date;

    @Column({
        type: DataType.DECIMAL(15, 2),
        allowNull: false,
    })
    declare salary: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    })
    declare companyId: number;

    @BelongsTo(() => Company)
    company: Company;
}
