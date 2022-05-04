import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'user@teste.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'User' })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Test' })
  lastname: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123' })
  password: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123' })
  rePassword: string
}
