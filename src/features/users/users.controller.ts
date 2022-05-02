import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/guards/jwt.guard'
import { CreateUserDTO } from './dto/create.user.dto'
import { UserModel } from './entity/users.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Post()
  async create(@Body() userDTO: CreateUserDTO): Promise<UserModel> {
    return await this.service.create(userDTO)
  }

  @Get()
  async getAll(): Promise<UserModel[]> {
    return await this.service.getAll()
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserModel> {
    return await this.service.get({ id })
  }
}
