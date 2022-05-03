import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCarDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  licensePlate: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  brand: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  dailyRate: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  fineAmount: number
}
