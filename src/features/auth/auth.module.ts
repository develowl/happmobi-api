import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import { LocalStrategy } from 'src/strategies/local.strategy'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || '8VXWRVcPn5LO3DPQwQkgudbEG6EZ6Wc9L6dmJbxgSn4=',
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
