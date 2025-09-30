import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Col } from "sequelize/lib/utils";
import { UserRole } from "../../users/models/user-role.model";
import { User } from "../../users/models/user.model";


interface IRoleCreation{
    value:string
    dascription: string
}

@Table({ tableName: "role" })
export class Role extends Model<Role, IRoleCreation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull:false,
    unique: true
  })
  declare value: string;

  @Column({
    type: DataType.STRING
  })
  declare dascription: string;

  @BelongsToMany(()=>User, ()=>UserRole)
  users:User[]
}
