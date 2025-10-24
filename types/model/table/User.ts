import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { UserRole } from '../../model/enum/UserRole'

@Entity('User')
export class User extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  username!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  password!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  nama!: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: 'Kasir',
  })
  role!: UserRole;
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