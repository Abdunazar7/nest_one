import { AllowNull, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "./user.model";
import { Role } from "../../role/models/role.model";


@Table({ tableName: "user_role" })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  declare userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare roleId: number;


}
