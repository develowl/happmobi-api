import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class UpdateCarDTO {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 25 })
  dailyRate?: number

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 33 })
  fineAmount?: number
}
