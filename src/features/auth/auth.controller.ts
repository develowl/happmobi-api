import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from 'src/guards/local.auth.guard'
import { CreateUserDTO } from '../users/dto/create.user.dto'
import { UserModel } from '../users/entity/users.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ jwt: string }> {
    return await this.authService.login(req.user)
  }

  @Post('register')
  async register(@Body() userDTO: CreateUserDTO): Promise<UserModel> {
    return await this.usersService.create(userDTO)
  }
}
