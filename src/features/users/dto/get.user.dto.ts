import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class GetUserDTO {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string
}
