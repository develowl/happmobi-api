import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCarDTO {
  @IsNotEmpty()
  @IsString()
  licensePlate: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  brand: string

  @IsNotEmpty()
  @IsNumber()
  dailyRate: number

  @IsNotEmpty()
  @IsNumber()
  fineAmount: number
}
