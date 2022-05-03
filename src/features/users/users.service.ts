import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateUserDTO } from './dto/create.user.dto'
import { GetUserDTO } from './dto/get.user.dto'
import { UserModel } from './entity/users.entity'
import { UpdateUserDTO } from './dto/update.user.dto'
import { UpdatePasswordDTO } from './dto/update.password.user.dto'
import { compare, hash } from 'bcrypt'
import { Role } from 'src/enums/role.enum'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserModel) private readonly repo: Repository<UserModel>) {}

  async get({ id, email }: GetUserDTO, role?: Role): Promise<UserModel> {
    const param = !id ? { email } : { id }
    try {
      return await this.repo.findOneBy({
        ...param,
        role: !!role && role === Role.User ? role : undefined
      })
    } catch {
      throw new NotFoundException('User not found')
    }
  }

  async getAll(role: Role = Role.User): Promise<UserModel[]> {
    return await this.repo.find({ where: { role: role === Role.Admin ? undefined : role } })
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
    const hashPassword = await hash(password, Number(process.env.SALT_GEN) || 10)
    this.repo.merge(user, { ...userDTO, password: hashPassword })

    const success = await this.repo.save(user)

    return !success ? 'Error on updating password!!' : 'Password updated successfully!!'
  }

  async delete(id: string): Promise<string> {
    const user = await this.repo.findOneBy({ id })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    try {
      await this.repo.softDelete({ id })
    } catch {
      throw new ForbiddenException('Impossible delete a user with active rental')
    }

    const deleted = await this.repo.findOneBy({ id })
    return !deleted ? 'User removed successfully!!' : 'Impossible to delete user!!'
  }

  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.repo.findOne({
      where: { email },
      select: { password: true }
    })

    return !!(await compare(password, user.password))
  }
}
