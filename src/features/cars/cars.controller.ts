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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
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
@ApiTags('Cars')
export class CarsController {
  constructor(@Inject(CarsService) private readonly service: CarsService) {}

  @Get('available')
  @ApiOperation({ summary: 'Get all available cars' })
  async getAllAvailable(): Promise<CarModel[]> {
    return await this.service.getAllAvailable()
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  async getAll(): Promise<CarModel[]> {
    return await this.service.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get specified car by id' })
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<CarModel> {
    return await this.service.get({ id })
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new car' })
  @ApiBody({
    type: CreateCarDTO,
    examples: {
      car: {
        value: {
          licensePlate: 'ABC123',
          name: 'Opala',
          brand: 'Chevrole',
          dailyRate: 30,
          fineAmount: 40
        }
      }
    }
  })
  async create(@Body() carDTO: CreateCarDTO): Promise<CarModel> {
    return await this.service.create(carDTO)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update an existing car' })
  @ApiBody({
    type: UpdateCarDTO,
    examples: {
      car: {
        value: {
          dailyRate: 31,
          fineAmount: 41
        }
      }
    }
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() carDTO: UpdateCarDTO
  ): Promise<CarModel> {
    return await this.service.update(id, carDTO)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a car' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return await this.service.delete(id)
  }
}
