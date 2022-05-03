import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from 'src/guards/local.auth.guard'
import { LocalStrategyDTO } from 'src/strategies/dto/local.strategy.dto'
import { CreateUserDTO } from '../users/dto/create.user.dto'
import { UserModel } from '../users/entity/users.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: LocalStrategyDTO,
    examples: {
      admin: {
        description: 'Admin account',
        value: {
          email: 'admin@admin.com',
          password: 'admin'
        }
      },
      user: {
        description: 'Regular user account',
        value: {
          email: 'user@teste.com',
          password: '123'
        }
      }
    }
  })
  async login(@Request() req): Promise<{ jwt: string }> {
    return await this.authService.login(req.user)
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: LocalStrategyDTO,
    examples: {
      user: {
        description: 'Regular user account',
        value: {
          email: 'user@teste.com',
          password: '123',
          rePassword: '123',
          name: 'User',
          lastname: 'Test'
        }
      }
    }
  })
  async register(@Body() userDTO: CreateUserDTO): Promise<UserModel> {
    return await this.usersService.create(userDTO)
  }
}
