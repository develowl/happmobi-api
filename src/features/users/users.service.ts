import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDTO } from './dto/create.user.dto'
import { GetUserDTO } from './dto/get.user.dto'
import { UserModel } from './entity/users.entity'
import { UpdateUserDTO } from './dto/update.user.dto'
import { UpdatePasswordDTO } from './dto/update.password.user.dto'
import { compare, hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserModel) private readonly repo: Repository<UserModel>) {}

  async get({ id, email }: GetUserDTO): Promise<UserModel> {
    try {
      return await this.repo.findOneBy([{ id }, { email }])
    } catch {
      throw new NotFoundException('User not found')
    }
  }

  async getAll(): Promise<UserModel[]> {
    return await this.repo.find()
  }

  async create(userDTO: CreateUserDTO): Promise<UserModel> {
    const { email, password, rePassword, ...user } = userDTO

    const passwordsMatch = password === rePassword
    if (!passwordsMatch) {
      throw new BadRequestException('Passwords do not match')
    }

    const userFound = await this.repo.findOneBy([{ email }])
    if (userFound) {
      throw new ConflictException('User already exists')
    }

    return await this.repo.save(
      this.repo.create({
        ...user,

        email,
        password
      })
    )
  }

  async updateInfo(id: string, userDTO: UpdateUserDTO): Promise<UserModel> {
    const user = await this.get({ id })
    this.repo.merge(user, userDTO)

    return await this.repo.save(user)
  }

  async updatePassword(id: string, userDTO: UpdatePasswordDTO): Promise<string> {
    const { password, rePassword } = userDTO

    const passwordsMatch = password === rePassword
    if (!passwordsMatch) {
      throw new BadRequestException('Passwords do not match')
    }
    const user = await this.get({ id })
    this.repo.merge(user, userDTO)

    const success = await this.repo.save(user)

    return !success ? 'Error on updating password!!' : 'Password updated successfully!!'
  }

  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.repo.findOne({
      where: { email },
      select: { password: true }
    })

    return !!(await compare(password, user.password))
  }
}
