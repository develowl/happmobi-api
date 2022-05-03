import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('Cars')
export class CarModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ name: 'license_plate', unique: true })
  readonly licensePlate: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column({ name: 'daily_rate' })
  dailyRate: number

  @Column({ name: 'fine_amount' })
  fineAmount: number

  @Column({ default: true })
  available: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
