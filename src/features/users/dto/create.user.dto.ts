import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(9)
  cpf: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  lastname: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  rePassword: string
}
