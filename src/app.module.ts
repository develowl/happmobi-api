import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './features/users/users.module'
import ormconfig from 'ormconfig'

@Module({
  imports: [TypeOrmModule.forRootAsync(ormconfig), UsersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
