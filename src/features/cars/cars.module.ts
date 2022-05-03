import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarsController } from './cars.controller'
import { CarsService } from './cars.service'
import { CarModel } from './entity/cars.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CarModel])],
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService]
})
export class CarsModule {}
