import { IsNumber, IsOptional } from 'class-validator'

export class UpdateCarDTO {
  @IsOptional()
  @IsNumber()
  dailyRate?: number

  @IsOptional()
  @IsNumber()
  fineAmount?: number
}
