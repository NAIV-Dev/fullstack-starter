import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Transaksi } from '../model/table/Transaksi'

export class T_adminUpdateTransaksiByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdateTransaksiByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
class T_adminUpdateTransaksiByID_body_2 {
  @IsOptional()
  @IsString({ message: 'nama must be a string' })
  nama?: string
  @IsOptional()
  @IsString({ message: 'nomor_hp must be a string' })
  nomor_hp?: string
  @IsOptional()
  @IsString({ message: 'alamat must be a string' })
  alamat?: string
}
class T_adminUpdateTransaksiByID_body_9 {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id?: number
  @IsNotEmpty({ message: 'layanan_id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'layanan_id must be a number (decimal)' })
  layanan_id!: number
  @IsNotEmpty({ message: 'jumlah cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'jumlah must be a number (decimal)' })
  jumlah!: number
}
export class T_adminUpdateTransaksiByID_body {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'pengguna_id must be a number (decimal)' })
  pengguna_id?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'pelanggan_id must be a number (decimal)' })
  pelanggan_id?: number
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => T_adminUpdateTransaksiByID_body_2)
  pelanggan_baru?: T_adminUpdateTransaksiByID_body_2
  @IsOptional()
  @IsString({ message: 'tanggal_transaksi must be a string' })
  tanggal_transaksi?: string
  @IsOptional()
  @IsString({ message: 'metode_pembayaran must be a string' })
  metode_pembayaran?: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'sudah_lunas must be a boolean' })
  sudah_lunas?: boolean
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'sudah_diambil must be a boolean' })
  sudah_diambil?: boolean
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_harga must be a number (decimal)' })
  total_harga?: number
  @IsOptional()
  @IsString({ message: 'catatan must be a string' })
  catatan?: string
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => T_adminUpdateTransaksiByID_body_9)
  items?: T_adminUpdateTransaksiByID_body_9[]
}

export type T_adminUpdateTransaksiByID = (request: {
  headers: T_adminUpdateTransaksiByID_headers
  path: T_adminUpdateTransaksiByID_path
  body: T_adminUpdateTransaksiByID_body
}, response: Response) => Promise<Transaksi>;

export const method = 'put';
export const url_path = '/admin/transaksi/:id';
export const alias = 'adminUpdateTransaksiByID';
