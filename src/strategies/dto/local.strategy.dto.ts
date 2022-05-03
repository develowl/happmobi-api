import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LocalStrategyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string
}
