import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCarDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'KLM7654' })
  licensePlate: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Gol' })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Volkswagen' })
  brand: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 25 })
  dailyRate: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 33 })
  fineAmount: number
}
