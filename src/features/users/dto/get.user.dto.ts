import { IsNotEmpty, IsString, Length } from 'class-validator'

export class GetUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(9)
  cpf: string
}
