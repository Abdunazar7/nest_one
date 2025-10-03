import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";


export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  name: string;

  @ApiProperty({
    example: "user@mail.uz",
    description: "Foydalanuvchi email",
  })
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6, // minimum length
      minUppercase: 1, // at least 1 uppercase
      minNumbers: 1, // at least 1 number
      minSymbols: 0, // symbols not required
    },
    {
      message: "Parol yetarlicha mustahkam emas", // custom error message
    }
  )
  password: string;

  @ApiProperty({
    example: "Admin",
    description: "Foydalanuvchi value",
  })
  value: string;
}
