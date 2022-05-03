import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class GetCarDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  licensePlate?: string
}
