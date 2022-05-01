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

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserModel) private readonly repo: Repository<UserModel>) {}

  async get({ cpf }: GetUserDTO): Promise<UserModel> {
    const userFound = await this.repo.findOneBy({ cpf })

    if (!userFound) throw new NotFoundException('User not found')

    return userFound
  }

  async getById(id: string): Promise<UserModel> {
    const userFound = await this.repo.findOneBy({ id })

    if (!userFound) throw new NotFoundException('User not found')

    return userFound
  }

  async getAll(): Promise<UserModel[]> {
    return await this.repo.find()
  }

  async create(userDTO: CreateUserDTO): Promise<UserModel> {
    const { cpf, password, rePassword, ...user } = userDTO

    const passwordsMatch = password === rePassword
    if (!passwordsMatch) {
      throw new BadRequestException('Passwords do not match')
    }

    const userFound = await this.repo.findOneBy({ cpf })
    if (userFound) {
      throw new ConflictException('User already exists')
    }

    return await this.repo.save(
      this.repo.create({
        ...user,
        cpf,
        password
      })
    )
  }
}
