import { hashSync } from 'bcrypt'
import { Role } from 'src/enums/role.enum'
import { RentalModel } from 'src/features/rentals/entity/rentals.entity'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt?: Date

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, Number(process.env.SALT_GEN) || 10)
  }

  @OneToMany(() => RentalModel, (rental) => rental.idUser, { nullable: true })
  rental?: RentalModel[]
}
