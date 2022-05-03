import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateRentalDTO {
  @IsNotEmpty()
  @IsUUID()
  idCar: string

  @IsOptional()
  @IsDateString()
  startDate?: Date

  @IsNotEmpty()
  @IsDateString()
  expectEndDate: Date
}
