import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastname: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  rePassword: string
}
