import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('versions')
export class Version extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Column({ name: 'is_successed', type: 'boolean', default: false })
  isSuccessed!: boolean

  @Column({ name: 'started_at', precision: 0, nullable: true })
  startedAt!: Date

  @Column({ name: 'finished_at', precision: 0, nullable: true })
  finishedAt!: Date
}
