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
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'
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
@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @UseGuards(RolesGuard)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new user - ADMIN OPERATION' })
  @ApiBody({
    type: AdminCreateUserDTO,
    examples: {
      user: {
        description: 'Regular user account',
        value: {
          email: 'user@teste.com',
          password: '123',
          rePassword: '123',
          name: 'User',
          lastname: 'Test'
        }
      }
    }
  })
  async create(@Body() userDTO: AdminCreateUserDTO): Promise<UserModel> {
    return await this.service.create(userDTO)
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async getAll(@Request() { user }: { user: UserModel }): Promise<UserModel[]> {
    return await this.service.getAll(user.role)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async get(@Request() req, @Param('id', new ParseUUIDPipe()) id: string): Promise<UserModel> {
    return await this.service.get({ id }, req.user.role as Role)
  }

  @Put('info')
  @ApiOperation({ summary: "Update connected user's info" })
  async updateInfo(
    @Request() { user }: { user: UserModel },
    @Body() updateUserDTO: UpdateUserDTO
  ): Promise<UserModel> {
    return await this.service.updateInfo(user.id, updateUserDTO)
  }

  @Put('password')
  @ApiOperation({ summary: "Update connected user's password" })
  async updatePassword(
    @Request() { user }: { user: UserModel },
    @Body() updatePasswordDTO: UpdatePasswordDTO
  ): Promise<string> {
    return await this.service.updatePassword(user.id, updatePasswordDTO)
  }

  @UseGuards(RolesGuard)
  @Delete()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a user - ADMIN OPERATION' })
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return await this.service.delete(id)
  }

  @Delete()
  @ApiOperation({ summary: "Delete connected user's account" })
  async deleteAccount(@Request() { user }: { user: UserModel }): Promise<string> {
    return await this.service.delete(user.id)
  }
}
