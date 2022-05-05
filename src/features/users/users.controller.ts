import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { mapSchemaExample, UserSchema } from 'src/helpers/swagger/schema'
import { AdminCreateUserDTO } from './dto/admin.create.user.dto'
import { UpdatePasswordDTO } from './dto/update.password.user.dto'
import { UpdateUserDTO } from './dto/update.user.dto'
import { UserModel } from './entity/users.entity'
import { UsersService } from './users.service'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @UseGuards(RolesGuard)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new account - ADMIN OPERATION' })
  @ApiBody({ type: AdminCreateUserDTO })
  @ApiCreatedResponse({ description: 'User created', schema: UserSchema })
  @ApiBadRequestResponse({
    description: 'Invalid parameters',
    schema: {
      ...UserSchema,
      example: { message: ['name should not be empty', 'password should be a string'] }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiConflictResponse({ description: 'User already exists' })
  async create(@Body() userDTO: AdminCreateUserDTO): Promise<UserModel> {
    return await this.service.create(userDTO)
  }

  @Get('me')
  @ApiOperation({ summary: 'Get logged in user' })
  @ApiOkResponse({ description: "Return logged in user's data", schema: UserSchema })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  async me(@Request() { user }: { user: UserModel }): Promise<UserModel> {
    return await this.service.get({ id: user.id })
  }

  @Get()
  @ApiOperation({ summary: 'Lists all users' })
  @ApiOkResponse({
    description: 'Lists an array of users',
    schema: {
      ...UserSchema,
      example: [mapSchemaExample(UserSchema)]
    },
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  async getAll(@Request() { user }: { user: UserModel }): Promise<UserModel[]> {
    return await this.service.getAll(user.role)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', example: 'a72f1214-8c2d-43bf-8e7e-c4e5cb80d911' })
  @ApiOkResponse({ description: "Return user's data related to the id param", schema: UserSchema })
  @ApiBadRequestResponse({ description: 'Validation failed (uuid  is expected)' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async get(@Request() req, @Param('id', new ParseUUIDPipe()) id: string): Promise<UserModel> {
    return await this.service.get({ id }, req.user.role as Role)
  }

  @Put('me/info')
  @ApiOperation({ summary: "Update connected user's info" })
  @ApiOkResponse({ schema: UserSchema })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  async updateInfo(
    @Request() { user }: { user: UserModel },
    @Body() updateUserDTO: UpdateUserDTO
  ): Promise<UserModel> {
    return await this.service.updateInfo(user.id, updateUserDTO)
  }

  @Put('me/password')
  @ApiOperation({ summary: "Update connected user's password" })
  @ApiOkResponse({ description: 'Password updated successfully!!' })
  @ApiBadRequestResponse({
    description: 'Invalid parameters',
    schema: {
      ...UserSchema,
      example: { message: ['password should not be empty', 'rePassword should be a string'] }
    }
  })
  @ApiNotAcceptableResponse({ description: 'Passwords do not match' })
  async updatePassword(
    @Request() { user }: { user: UserModel },
    @Body() updatePasswordDTO: UpdatePasswordDTO
  ): Promise<string> {
    return await this.service.updatePassword(user.id, updatePasswordDTO)
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a user - ADMIN OPERATION' })
  @ApiParam({ name: 'id', example: 'a72f1214-8c2d-43bf-8e7e-c4e5cb80d911' })
  @ApiOkResponse({ description: 'User removed successfully!!' })
  @ApiBadRequestResponse({ description: 'Validation failed (uuid  is expected)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized permission' })
  @ApiForbiddenResponse({ description: 'Unable to delete! User currently have an active rent' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return await this.service.delete(id)
  }

  @Delete()
  @ApiOperation({ summary: "Delete connected user's account" })
  @ApiOkResponse({ description: 'User removed successfully!!' })
  @ApiForbiddenResponse({ description: 'Unable to delete! User currently have an active rent' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteAccount(@Request() { user }: { user: UserModel }): Promise<string> {
    return await this.service.delete(user.id)
  }
}
