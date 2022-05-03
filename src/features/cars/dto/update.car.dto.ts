import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class UpdateCarDTO {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  dailyRate?: number

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  fineAmount?: number
}
