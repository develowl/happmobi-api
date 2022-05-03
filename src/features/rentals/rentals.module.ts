import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarsModule } from '../cars/cars.module'
import { CarsService } from '../cars/cars.service'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { RentalModel } from './entity/rentals.entity'
import { RentalsController } from './rentals.controller'
import { RentalsService } from './rentals.service'

@Module({
  imports: [TypeOrmModule.forFeature([RentalModel]), UsersModule, CarsModule],
  providers: [RentalsService],
  controllers: [RentalsController],
  exports: [RentalsService]
})
export class RentalsModule {}
