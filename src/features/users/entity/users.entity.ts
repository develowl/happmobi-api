import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ unique: true, length: 9 })
  readonly cpf: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  lastname: string
}
