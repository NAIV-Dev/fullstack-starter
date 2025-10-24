import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Transaksi } from '../../model/table/Transaksi'
import { Layanan } from '../../model/table/Layanan'

@Entity('TransaksiDetail')
export class TransaksiDetail extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => Transaksi, x => x.id, { nullable: false })
  @JoinColumn({ name: 'transaksi_id' })
  otm_transaksi_id?: Transaksi;
  @Column({
    name: 'transaksi_id',
    type: 'bigint',
    nullable: false,
  })
  transaksi_id!: number;
  @ManyToOne(() => Layanan, x => x.id, { nullable: false })
  @JoinColumn({ name: 'layanan_id' })
  otm_layanan_id?: Layanan;
  @Column({
    name: 'layanan_id',
    type: 'bigint',
    nullable: false,
  })
  layanan_id!: number;
  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 4,
  })
  jumlah?: number;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  harga_satuan!: number;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  subtotal!: number;
}