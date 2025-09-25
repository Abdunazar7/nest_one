import { AutoIncrement, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Machine } from "../../machine/models/machine.model";
import { Driver } from "../../driver/models/driver.model";

interface IMachineDriverAttributes {
    machineId: number;
    driverId: number;
}

@Table({
    tableName: "machine_drivers",
    timestamps: false,})
export class MachineDriver extends Model<MachineDriver, IMachineDriverAttributes> {
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
}
