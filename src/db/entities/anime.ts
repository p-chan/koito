import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

import { Version } from './version'

@Entity('animes')
export class Anime extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number

  @Column({ name: 'title' })
  title!: string

  @Column({ name: 'link' })
  link!: string

  @Column({ name: 'keyvisual_url', nullable: true })
  keyvisualURL!: string

  @Column({ name: 'keyvisual_alt', nullable: true })
  keyvisualAlt!: string

  @Column({ name: 'attibutes', nullable: true })
  attributes!: string

  @Column({ name: 'types', nullable: true })
  types!: string

  @Column({ name: 'mylist_count', nullable: true })
  mylistCount!: number

  @Column({ name: 'favorite_count', nullable: true })
  favoriteCount!: number

  @Column({ name: 'episodes_count', nullable: true })
  episodesCount!: number

  @Column({ name: 'created_year', nullable: true })
  createdYear!: number

  @Column({ name: 'season_name', nullable: true })
  seasonName!: string

  @CreateDateColumn({
    name: 'created_at',
    precision: 0,
    default: () => 'NOW()'
  })
  createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_at',
    precision: 0,
    default: () => 'NOW()'
  })
  updatedAt!: Date

  @ManyToOne(type => Version)
  @JoinColumn({ name: 'version_id', referencedColumnName: 'id' })
  versionId!: Version
}
