import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { CreateRentalDTO } from './create.rental.dto'

export class AdminCreateRentalDTO extends CreateRentalDTO {
  @IsNotEmpty()
  @IsUUID()
  idUser: string
}
