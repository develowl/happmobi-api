import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastname?: string
}
