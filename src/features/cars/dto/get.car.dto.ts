import { IsOptional, IsString } from 'class-validator'

export class GetCarDTO {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  licensePlate?: string
}
