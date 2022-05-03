import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class GetUserDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string
}
