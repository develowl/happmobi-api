import { RentalStatus } from 'src/enums/rental.enum'
import { CarModel } from 'src/features/cars/entity/cars.entity'
import { UserModel } from 'src/features/users/entity/users.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('Rentals')
export class RentalModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @ManyToOne(() => UserModel, { eager: true, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'id_user' })
  idUser: UserModel

  @ManyToOne(() => CarModel, { eager: true })
  @JoinColumn({ name: 'id_car' })
  idCar: CarModel

  @Column({ name: 'start_date', default: new Date() })
  startDate: Date

  @Column({ name: 'end_date', nullable: true })
  endDate?: Date

  @Column({ name: 'expeect_end_date' })
  expectEndDate: Date

  @Column({ default: 0 })
  total: number

  @Column({ enum: RentalStatus, default: RentalStatus.ACTIVE })
  status: RentalStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt?: Date
}
