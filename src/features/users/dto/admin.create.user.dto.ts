import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { Role } from 'src/enums/role.enum'
import { CreateUserDTO } from './create.user.dto'

export class AdminCreateUserDTO extends CreateUserDTO {
  @IsOptional()
  @IsEnum(Role)
  role?: Role
}
