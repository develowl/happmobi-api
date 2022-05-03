import { hashSync } from 'bcrypt'
import { Role } from 'src/enums/role.enum'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, process.env.SALT_GEN || 10)
  }
}
