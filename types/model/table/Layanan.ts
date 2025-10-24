import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('Layanan')
export class Layanan extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  nama!: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  label_satuan?: string;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  harga_satuan!: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  deskripsi?: string;
  @Column({
    type: 'boolean',
    nullable: false,
    default: () => "true",
  })
  is_active!: boolean;
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