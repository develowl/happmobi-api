import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { LocalAuthGuard } from 'src/guards/local.auth.guard'
import { UserSchema } from 'src/helpers/swagger/schema'
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
        value: LocalStrategyDTO
      }
    }
  })
  @ApiCreatedResponse({
    description: 'User logged in',
    schema: {
      properties: {
        jwt: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZjczNWIyNS04ZDU2LTRkNjUtYjM4MC1kMmJiNmI0MGMyYzciLCJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjUxNjYxNzY3LCJleHAiOjE2NTE3NDgxNjd9.4Rxc3xZeAhBIYLY7tS8QPoBdUSdv5km2hTnmVGRIAAE'
        }
      }
    }
  })
  @ApiBadRequestResponse({ description: 'Incorrect email or password' })
  async login(@Request() req): Promise<{ jwt: string }> {
    return await this.authService.login(req.user)
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: 'User created', schema: UserSchema })
  @ApiBadRequestResponse({ description: 'Invalid or missing parameters' })
  @ApiConflictResponse({ description: 'User already exists' })
  async register(@Body() userDTO: CreateUserDTO): Promise<UserModel> {
    return await this.usersService.create(userDTO)
  }
}
