import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RentalStatus } from 'src/enums/rental.enum'
import { Role } from 'src/enums/role.enum'
import { Repository } from 'typeorm'
import { CarsService } from '../cars/cars.service'
import { UsersService } from '../users/users.service'
import { AdminCreateRentalDTO } from './dto/admin.create.rental.dto'
import { CreateRentalDTO } from './dto/create.rental.dto'
import { RentalModel } from './entity/rentals.entity'
import * as dayjs from 'dayjs'

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(RentalModel) private readonly repo: Repository<RentalModel>,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(CarsService) private readonly carsService: CarsService
  ) {}

  async get(id: string): Promise<RentalModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException('Rent not found')
    }
  }

  async myActiveRent(idUser: string): Promise<RentalModel> {
    const userFound = await this.usersService.get({ id: idUser })

    if (userFound.role === Role.Admin) {
      throw new ForbiddenException('Admin user is not allowed to rent a car')
    }

    try {
      return await this.repo.findOneBy({
        idUser: {
          id: idUser
        }
      })
    } catch {
      throw new NotFoundException('You have no active rents currently.')
    }
  }

  async myRents(idUser: string): Promise<RentalModel[]> {
    const userFound = await this.usersService.get({ id: idUser })

    if (userFound.role === Role.Admin) {
      throw new ForbiddenException('Admin user is not allowed to rent a car')
    }

    try {
      return await this.repo.find({
        where: {
          idUser: {
            id: idUser,
            role: Role.User
          }
        },
        order: {
          status: {
            direction: 'ASC'
          }
        },
        withDeleted: true
      })
    } catch {
      throw new NotFoundException('You have no active rents currently.')
    }
  }

  async getAll(): Promise<RentalModel[]> {
    return await this.repo.find({ withDeleted: true })
  }

  async getAllActive(): Promise<RentalModel[]> {
    return await this.repo.find()
  }

  async rent(rentalDTO: AdminCreateRentalDTO): Promise<RentalModel> {
    const { idUser, idCar, ...rental } = rentalDTO

    const userFound = await this.usersService.get({ id: idUser })
    if (userFound.role === Role.Admin) {
      throw new ForbiddenException('Admin user is not allowed to rent a car')
    }

    const carFound = await this.carsService.get({ id: idCar })

    const rentalFound = await this.repo.findOneBy([
      { idUser: { id: userFound.id } },
      { idCar: { id: carFound.id } }
    ])

    if (!!rentalFound || !!rentalFound?.deletedAt) {
      throw new ConflictException('User or car already have an active rent')
    }

    await this.carsService.setAvailable(carFound, false)

    return await this.repo.save(
      this.repo.create({
        ...rental,
        idUser: userFound,
        idCar: carFound
      })
    )
  }

  async giveBack(id: string): Promise<RentalModel> {
    const rentalFound = await this.repo.findOneBy({ id })

    if (!rentalFound) {
      throw new NotFoundException('Rental not found')
    }

    if (rentalFound.status === RentalStatus.COMPLETED) {
      throw new BadRequestException('Rent is already completed')
    }

    const car = rentalFound.idCar
    const startDate = rentalFound.startDate
    const expectEndDate = rentalFound.expectEndDate
    const endDate = new Date()
    const diffDays = dayjs(endDate).diff(expectEndDate, 'day')
    const rateDays = dayjs(startDate).diff(endDate, 'day')
    const rate = car.dailyRate * (rateDays > 0 ? rateDays : 1)
    const total = diffDays > 0 ? rate + car.fineAmount : rate
    this.repo.merge(rentalFound, {
      status: RentalStatus.COMPLETED,
      endDate: new Date(),
      total
    })
    await this.repo.save(rentalFound)
    await this.repo.softDelete({ id: rentalFound.id })

    return rentalFound
  }
}
