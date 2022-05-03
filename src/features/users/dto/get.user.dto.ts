import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

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
