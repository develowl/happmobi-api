import { hashSync } from 'bcrypt'
import { Role } from 'src/enums/role.enum'
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Users')
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ unique: true })
  readonly email: string

  @Column({ select: false })
  password: string

  @Column()
  name: string

  @Column()
  lastname: string

  @Column({ default: Role.User })
  role: Role

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, process.env.SALT_GEN || 10)
  }
}
