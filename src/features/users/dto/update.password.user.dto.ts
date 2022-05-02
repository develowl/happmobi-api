import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  rePassword: string
}
