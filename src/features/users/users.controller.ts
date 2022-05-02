import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common'
import { Roles } from 'src/docorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { AdminCreateUserDTO } from './dto/admin.create.user.dto'
import { CreateUserDTO } from './dto/create.user.dto'
import { UpdatePasswordDTO } from './dto/update.password.user.dto'
import { UpdateUserDTO } from './dto/update.user.dto'
import { UserModel } from './entity/users.entity'
import { UsersService } from './users.service'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @UseGuards(RolesGuard)
  @Post()
  @Roles(Role.Admin)
  async create(@Body() userDTO: AdminCreateUserDTO): Promise<UserModel> {
    return await this.service.create(userDTO)
  }

  @Get()
  async getAll(@Request() { user }: { user: UserModel }): Promise<UserModel[]> {
    return await this.service.getAll(user.role)
  }

  @Get(':id')
  async get(@Request() req, @Param('id', new ParseUUIDPipe()) id: string): Promise<UserModel> {
    return await this.service.get({ id }, req.user.role as Role)
  }

  @Put()
  async updateInfo(
    @Request() { user }: { user: UserModel },
    @Body() updateUserDTO: UpdateUserDTO
  ): Promise<UserModel> {
    return await this.service.updateInfo(user.id, updateUserDTO)
  }

  @Put()
  async updatePassword(
    @Request() { user }: { user: UserModel },
    @Body() updatePasswordDTO: UpdatePasswordDTO
  ): Promise<string> {
    return await this.service.updatePassword(user.id, updatePasswordDTO)
  }

  @UseGuards(RolesGuard)
  @Delete()
  @Roles(Role.Admin)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return await this.service.delete(id)
  }

  @Delete()
  async deleteAccount(@Request() { user }: { user: UserModel }): Promise<string> {
    return await this.service.delete(user.id)
  }
}
