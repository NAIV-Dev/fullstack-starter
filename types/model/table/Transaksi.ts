import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Pelanggan } from '../../model/table/Pelanggan'
import { User } from '../../model/table/User'
import { MetodePembayaran } from '../../model/enum/MetodePembayaran'

@Entity('Transaksi')
export class Transaksi extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => Pelanggan, x => x.id, { nullable: true })
  @JoinColumn({ name: 'pelanggan_id' })
  otm_pelanggan_id?: Pelanggan;
  @Column({
    name: 'pelanggan_id',
    type: 'bigint',
    nullable: true,
  })
  pelanggan_id?: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  nomor_transaksi!: string;
  @ManyToOne(() => User, x => x.id, { nullable: false })
  @JoinColumn({ name: 'pengguna_id' })
  otm_pengguna_id?: User;
  @Column({
    name: 'pengguna_id',
    type: 'bigint',
    nullable: false,
  })
  pengguna_id!: number;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  tanggal_transaksi!: Date;
  @Column({
    type: 'boolean',
    nullable: true,
    default: () => "false",
  })
  sudah_lunas?: boolean;
  @Column({
    type: 'boolean',
    nullable: true,
    default: () => "false",
  })
  sudah_diambil?: boolean;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  total_harga!: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  catatan?: string;
  @Column({
    type: 'enum',
    enum: MetodePembayaran,
    nullable: false,
    default: 'Tunai',
  })
  metode_pembayaran!: MetodePembayaran;
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
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  transition_to_paid_ts?: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  transition_to_picked_up_ts?: Date;
}