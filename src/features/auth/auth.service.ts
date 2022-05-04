import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { UserModel } from '../users/entity/users.entity'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/strategies/jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.userService.get({ email })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const valid = await this.userService.validate(email, password)
    if (!valid) {
      return null
    }

    return user
  }

  async login(user: UserModel) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    }

    return Promise.resolve({
      jwt: this.jwtService.sign(payload)
    })
  }
}
