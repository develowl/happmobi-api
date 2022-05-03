import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCarDTO } from './dto/create.car.dto'
import { GetCarDTO } from './dto/get.car.dto'
import { UpdateCarDTO } from './dto/update.car.dto'
import { CarModel } from './entity/cars.entity'

@Injectable()
export class CarsService {
  constructor(@InjectRepository(CarModel) private readonly repo: Repository<CarModel>) {}

  async get({ id, licensePlate }: GetCarDTO): Promise<CarModel> {
    try {
      return await this.repo.findOneBy([{ id }, { licensePlate }])
    } catch {
      throw new NotFoundException('Car not found')
    }
  }

  async getAll(): Promise<CarModel[]> {
    return await this.repo.find()
  }

  async getAllAvailable(): Promise<CarModel[]> {
    return await this.repo.findBy({ available: true })
  }

  async create(carDTO: CreateCarDTO): Promise<CarModel> {
    const { licensePlate, ...car } = carDTO

    const carFound = await this.repo.findOneBy({ licensePlate })
    if (carFound) {
      throw new ConflictException('Car already exists')
    }

    return await this.repo.save(
      this.repo.create({
        licensePlate,
        ...car
      })
    )
  }

  async setAvailable(car: CarModel, available: boolean): Promise<void> {
    this.repo.merge(car, { available })
    await this.repo.save(car)
  }

  async update(id: string, carDTO: UpdateCarDTO): Promise<CarModel> {
    const car = await this.get({ id })
    if (!car.available) {
      throw new ForbiddenException('Impossible update an unavailable car')
    }
    this.repo.merge(car, carDTO)
    return await this.repo.save(car)
  }

  async delete(id: string): Promise<string> {
    const car = await this.repo.findOneBy({ id })

    if (!car) {
      throw new NotFoundException('Car not found')
    }

    const deleted = await this.repo.findOneBy({ id })
    return !deleted ? 'Car removed successfully!!' : 'Impossible to delete car!!'
  }
}
