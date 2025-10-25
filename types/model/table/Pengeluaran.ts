import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User } from '../../model/table/User'
import { JenisPengeluaran } from '../../model/table/JenisPengeluaran'

@Entity('Pengeluaran')
export class Pengeluaran extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => User, x => x.id, { nullable: false })
  @JoinColumn({ name: 'pengguna_id' })
  otm_pengguna_id?: User;
  @Column({
    name: 'pengguna_id',
    type: 'bigint',
    nullable: false,
  })
  pengguna_id!: number;
  @ManyToOne(() => JenisPengeluaran, x => x.id, { nullable: true })
  @JoinColumn({ name: 'id_jenis_pengeluaran' })
  otm_id_jenis_pengeluaran?: JenisPengeluaran;
  @Column({
    name: 'id_jenis_pengeluaran',
    type: 'bigint',
    nullable: true,
  })
  id_jenis_pengeluaran?: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  nomor_pengeluaran!: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  tanggal!: Date;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  deskripsi!: string;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  jumlah!: number;
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