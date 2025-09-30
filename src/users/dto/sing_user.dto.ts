import { IsEmail } from "class-validator";

export class SinginUserDto {
  email: string;
  password: string;
}
