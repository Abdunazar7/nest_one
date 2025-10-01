import { Role } from "../../../role/models/role.model"
import { User } from "../../models/user.model"


export const userStub = (): Partial<User | Role> => {
    return {
        id:1,
        name: "user1",
        email: "user1gmail.uz",
        password: "1234567",
        is_active: true,
        value: "admin",
    }
}