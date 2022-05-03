import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateRentalDTO } from './create.rental.dto'

export class AdminCreateRentalDTO extends CreateRentalDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  idUser: string
}
