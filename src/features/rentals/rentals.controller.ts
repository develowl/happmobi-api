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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { UserModel } from '../users/entity/users.entity'
import { AdminCreateRentalDTO } from './dto/admin.create.rental.dto'
import { CreateRentalDTO } from './dto/create.rental.dto'
import { RentalModel } from './entity/rentals.entity'
import { RentalsService } from './rentals.service'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rentals')
@ApiTags('Rentals')
export class RentalsController {
  constructor(@Inject(RentalsService) private readonly service: RentalsService) {}

  @Get('me/active')
  @ApiOperation({ summary: "Get user's active rent" })
  async myRent(@Request() { user }: { user: UserModel }): Promise<RentalModel> {
    return await this.service.myActiveRent(user.id)
  }

  @Get('me/history')
  @ApiOperation({ summary: "Get user's rents history" })
  async myRents(@Request() { user }: { user: UserModel }): Promise<RentalModel[]> {
    return await this.service.myRents(user.id)
  }

  @UseGuards(RolesGuard)
  @Get('active')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all active rents - ADMIN OPERATION' })
  async getAllActive(): Promise<RentalModel[]> {
    return await this.service.getAllActive()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rent by id' })
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<RentalModel> {
    return await this.service.get(id)
  }

  @UseGuards(RolesGuard)
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all rents - ADMIN OPERATION' })
  async getAll(): Promise<RentalModel[]> {
    return await this.service.getAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new rent for connected user' })
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
  async adminCreate(@Body() rentalDTO: AdminCreateRentalDTO): Promise<RentalModel> {
    return await this.service.rent(rentalDTO)
  }

  @Put(':id')
  @ApiOperation({ summary: "Return a car related to the user's active rent" })
  async giveBack(@Param('id', new ParseUUIDPipe()) id: string): Promise<RentalModel> {
    return await this.service.giveBack(id)
  }
}
