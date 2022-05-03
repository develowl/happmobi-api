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
import { UserModel } from '../users/entity/users.entity'
import { AdminCreateRentalDTO } from './dto/admin.create.rental.dto'
import { CreateRentalDTO } from './dto/create.rental.dto'
import { RentalModel } from './entity/rentals.entity'
import { RentalsService } from './rentals.service'

@UseGuards(JwtAuthGuard)
@Controller('rentals')
export class RentalsController {
  constructor(@Inject(RentalsService) private readonly service: RentalsService) {}

  @Get('me/active')
  async myRental(@Request() { user }: { user: UserModel }): Promise<RentalModel> {
    return await this.service.myActiveRental(user.id)
  }

  @Get('me/history')
  async myRentals(@Request() { user }: { user: UserModel }): Promise<RentalModel[]> {
    return await this.service.myRentals(user.id)
  }

  @UseGuards(RolesGuard)
  @Get('active')
  @Roles(Role.Admin)
  async getAllActive(): Promise<RentalModel[]> {
    return await this.service.getAllActive()
  }

  @UseGuards(RolesGuard)
  @Get()
  @Roles(Role.Admin)
  async getAll(): Promise<RentalModel[]> {
    return await this.service.getAll()
  }

  @Post()
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
  async adminCreate(@Body() rentalDTO: AdminCreateRentalDTO): Promise<RentalModel> {
    return await this.service.rent(rentalDTO)
  }

  @Put(':id')
  async giveBack(@Param('id', new ParseUUIDPipe()) id: string): Promise<RentalModel> {
    return await this.service.giveBack(id)
  }
}
