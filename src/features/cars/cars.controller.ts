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
  UseGuards
} from '@nestjs/common'
import { Roles } from 'src/docorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { CarsService } from './cars.service'
import { CreateCarDTO } from './dto/create.car.dto'
import { GetCarDTO } from './dto/get.car.dto'
import { UpdateCarDTO } from './dto/update.car.dto'
import { CarModel } from './entity/cars.entity'

@Controller('cars')
export class CarsController {
  constructor(@Inject(CarsService) private readonly service: CarsService) {}

  @Get('available')
  async getAllAvailable(): Promise<CarModel[]> {
    return await this.service.getAllAvailable()
  }

  @Get()
  async getAll(): Promise<CarModel[]> {
    return await this.service.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<CarModel> {
    return await this.service.get({ id })
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  async create(@Body() carDTO: CreateCarDTO): Promise<CarModel> {
    return await this.service.create(carDTO)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() carDTO: UpdateCarDTO
  ): Promise<CarModel> {
    return await this.service.update(id, carDTO)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return await this.service.delete(id)
  }
}
