import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LocalStrategyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'teste@teste.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'teste' })
  password: string
}
