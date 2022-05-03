import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './features/users/users.module'
import ormconfig from 'ormconfig'
import { AuthModule } from './features/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { CarsModule } from './features/cars/cars.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    CarsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
