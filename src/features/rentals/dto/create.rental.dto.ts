import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class CreateRentalDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  idCar: string

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  startDate?: Date

  @IsNotEmpty()
  @IsDateString()
  @ApiPropertyOptional()
  expectEndDate: Date
}
