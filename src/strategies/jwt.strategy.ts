import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserModel } from 'src/features/users/entity/users.entity'
import { UsersService } from 'src/features/users/users.service'

export type JwtPayload = {
  sub: string
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) {
    super({
      secretOrKey: process.env.JWT_SECRET || 'SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false
    })
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    return await this.usersService.get({ id: payload.sub })
  }
}
