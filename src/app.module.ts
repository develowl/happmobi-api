import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './features/users/users.module'
import ormconfig from 'ormconfig'
import { AuthModule } from './features/auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ormconfig), AuthModule, UsersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
