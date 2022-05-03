import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { Role } from 'src/enums/role.enum'
import { CreateUserDTO } from './create.user.dto'

export class AdminCreateUserDTO extends CreateUserDTO {
  @IsOptional()
  @IsEnum(Role)
  @ApiPropertyOptional({ name: 'role', enum: [Role.Admin, Role.User], default: Role.User })
  role?: Role
}
