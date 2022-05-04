import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../features/auth/auth.service'
import { UserModel } from 'src/features/users/entity/users.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string): Promise<UserModel> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new BadRequestException('Incorrect email or password')
    }
    return user
  }
}
