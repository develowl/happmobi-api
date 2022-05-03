import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('Cars')
export class CarModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({ name: 'daily_rate' })
  dailyRate: number

  @Column({ name: 'fine_amount' })
  fineAmount: number

  @Column({ default: true })
  available: boolean

  @Column({ name: 'license_plate' })
  licensePlate: string

  @Column()
  brand: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
