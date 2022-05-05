import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { RentalStatus } from 'src/enums/rental.enum'
import { Role } from 'src/enums/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { RentalSchema, mapSchemaExample } from 'src/helpers/swagger/schema'
import { UserModel } from '../users/entity/users.entity'
import { AdminCreateRentalDTO } from './dto/admin.create.rental.dto'
import { CreateRentalDTO } from './dto/create.rental.dto'
import { RentalModel } from './entity/rentals.entity'
import { RentalsService } from './rentals.service'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rentals')
@ApiTags('Rentals')
@ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
export class RentalsController {
  constructor(@Inject(RentalsService) private readonly service: RentalsService) {}

  @Get('me/active')
  @ApiOperation({ summary: "Get user's active rent" })
  @ApiOkResponse({ schema: RentalSchema })
  @ApiUnauthorizedResponse({ description: 'Unaithorized permission' })
  @ApiForbiddenResponse({ description: 'Admin user is not allowed to rent a car' })
  @ApiNotFoundResponse({ description: 'You have no active rent currently' })
  async myRent(@Request() { user }: { user: UserModel }): Promise<RentalModel> {
    return await this.service.myActiveRent(user.id)
  }

  @Get('me/history')
  @ApiOperation({ summary: "Get user's rents history" })
  @ApiOkResponse({
    schema: {
      ...RentalSchema,
      example: [mapSchemaExample(RentalSchema)]
    }
  })
  async myRents(@Request() { user }: { user: UserModel }): Promise<RentalModel[]> {
    return await this.service.myRents(user.id)
  }

  @UseGuards(RolesGuard)
  @Get('active')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all active rents - ADMIN OPERATION' })
  @ApiOkResponse({
    schema: {
      ...RentalSchema,
      example: [mapSchemaExample(RentalSchema)]
    }
  })
  async getAllActive(): Promise<RentalModel[]> {
    return await this.service.getAllActive()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rent by id' })
  @ApiParam({ name: 'id', example: '2a5bb5f1-133a-4927-afae-9184aa3cf413' })
  @ApiOkResponse({ schema: RentalSchema })
  @ApiNotFoundResponse({ description: 'Rent not found' })
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<RentalModel> {
    return await this.service.get(id)
  }

  @UseGuards(RolesGuard)
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all rents - ADMIN OPERATION' })
  @ApiOkResponse({
    schema: {
      ...RentalSchema,
      example: [mapSchemaExample(RentalSchema)]
    }
  })
  async getAll(): Promise<RentalModel[]> {
    return await this.service.getAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new rent for connected user' })
  @ApiOkResponse({ schema: RentalSchema })
  @ApiForbiddenResponse({ description: 'Admin user is not allowed to rent a car' })
  @ApiNotFoundResponse({ description: 'User not found | OR | Car not found' })
  @ApiConflictResponse({ description: 'User or car already have an active rent' })
  async create(
    @Request() { user }: { user: UserModel },
    @Body() rental: CreateRentalDTO
  ): Promise<RentalModel> {
    return await this.service.rent({
      ...rental,
      idUser: user.id
    })
  }

  @UseGuards(RolesGuard)
  @Post('admin')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new rent - ADMIN OPERATION' })
  @ApiOkResponse({ schema: RentalSchema })
  @ApiForbiddenResponse({ description: 'Admin user is not allowed to rent a car' })
  @ApiNotFoundResponse({ description: 'User not found | OR | Car not found' })
  @ApiConflictResponse({ description: 'User or car already have an active rent' })
  async adminCreate(@Body() rentalDTO: AdminCreateRentalDTO): Promise<RentalModel> {
    return await this.service.rent(rentalDTO)
  }

  @Put()
  @ApiOperation({ summary: "Return car related to the user's active rent" })
  @ApiOkResponse({
    schema: {
      ...RentalSchema,
      example: {
        ...mapSchemaExample(RentalSchema),
        status: RentalStatus.COMPLETED
      }
    }
  })
  @ApiForbiddenResponse({ description: 'Admin user is not allowed to give a car back' })
  @ApiNotFoundResponse({ description: 'User have no active rent' })
  async giveBack(@Request() { user }: { user: UserModel }): Promise<RentalModel> {
    return await this.service.giveBack(user.id)
  }
}
