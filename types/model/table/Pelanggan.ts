import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('Pelanggan')
export class Pelanggan extends BaseEntity {
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
  nomor_hp?: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  alamat?: string;
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