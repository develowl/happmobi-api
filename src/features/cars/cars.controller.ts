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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { CarSchema, mapSchemaExample } from 'src/helpers/swagger/schema'
import { CarsService } from './cars.service'
import { CreateCarDTO } from './dto/create.car.dto'
import { UpdateCarDTO } from './dto/update.car.dto'
import { CarModel } from './entity/cars.entity'

@ApiBearerAuth()
@Controller('cars')
@ApiTags('Cars')
export class CarsController {
  constructor(@Inject(CarsService) private readonly service: CarsService) {}

  @Get('available')
  @ApiOperation({ summary: 'Get all available cars' })
  @ApiOkResponse({
    schema: {
      ...CarSchema,
      example: [mapSchemaExample(CarSchema)]
    }
  })
  async getAllAvailable(): Promise<CarModel[]> {
    return await this.service.getAllAvailable()
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  @ApiOkResponse({
    schema: {
      ...CarSchema,
      example: [mapSchemaExample(CarSchema)]
    }
  })
  async getAll(): Promise<CarModel[]> {
    return await this.service.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', example: 'fd0a8564-26a9-4213-bb6e-4376dd10aec4' })
  @ApiOperation({ summary: 'Get specific car by id' })
  @ApiOkResponse({ schema: CarSchema })
  @ApiBadRequestResponse({ description: 'Validation failed (uuid  is expected)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  @ApiNotFoundResponse({ description: 'Car not found' })
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<CarModel> {
    return await this.service.get({ id })
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new car - ADMIN OPERATION' })
  @ApiBody({ type: CreateCarDTO })
  @ApiCreatedResponse({ schema: CarSchema })
  @ApiBadRequestResponse({
    schema: {
      example: {
        message: ['brand must be a string', 'brand should not be empty']
      }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  @ApiConflictResponse({ description: 'Car already exists' })
  async create(@Body() carDTO: CreateCarDTO): Promise<CarModel> {
    return await this.service.create(carDTO)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update an existing car - ADMIN OPERATION' })
  @ApiParam({ name: 'id', example: 'fd0a8564-26a9-4213-bb6e-4376dd10aec4' })
  @ApiBody({ type: UpdateCarDTO })
  @ApiOkResponse({ schema: CarSchema })
  @ApiBadRequestResponse({
    description:
      'fineAmount must be a number conforming to the specified constraints | OR | Validation failed (uuid  is expected)'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  @ApiNotFoundResponse({ description: 'Car not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() carDTO: UpdateCarDTO
  ): Promise<CarModel> {
    return await this.service.update(id, carDTO)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a car - ADMIN OPERATION' })
  @ApiParam({ name: 'id', example: 'fd0a8564-26a9-4213-bb6e-4376dd10aec4' })
  @ApiOkResponse({ description: 'Car removed successfully!!' })
  @ApiBadRequestResponse({ description: 'Validation failed (uuid  is expected)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  @ApiForbiddenResponse({ description: 'Unable to delete a car with active rent' })
  @ApiNotFoundResponse({ description: 'Car not found' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return await this.service.delete(id)
  }
}
