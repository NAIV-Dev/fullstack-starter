import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('JenisPengeluaran')
export class JenisPengeluaran extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  label!: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  deskripsi?: string;
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => "NOW()",
  })
  created_at!: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at?: Date;
}