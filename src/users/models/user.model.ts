import { AllowNull, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Role } from "../../role/models/role.model";
import { UserRole } from "./user-role.model";
import { ApiProperty } from "@nestjs/swagger";


interface IUserCA{
    name: string
    email: string
    password: string
}

@Table({ tableName: "user" })
export class User extends Model<User, IUserCA> {
  @ApiProperty({
    example: "1",
    description: "Foydalanuvchi id",
  })
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
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "1234567",
    description: "Foydalanuvchi paroli",
  })
  @Column({
    type: DataType.STRING(100),
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
