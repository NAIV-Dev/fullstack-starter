import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Transaksi } from '../model/table/Transaksi'

export class T_kasirUpdateTransaksiByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_kasirUpdateTransaksiByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
class T_kasirUpdateTransaksiByID_body_7 {
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
export class T_kasirUpdateTransaksiByID_body {
  @IsNotEmpty({ message: 'pelanggan_id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'pelanggan_id must be a number (decimal)' })
  pelanggan_id!: number
  @IsOptional()
  @IsString({ message: 'tanggal_transaksi must be a string' })
  tanggal_transaksi?: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'sudah_lunas must be a boolean' })
  sudah_lunas?: boolean
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'sudah_diambil must be a boolean' })
  sudah_diambil?: boolean
  @IsOptional()
  @IsString({ message: 'metode_pembayaran must be a string' })
  metode_pembayaran?: string
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
  @Type(() => T_kasirUpdateTransaksiByID_body_7)
  items?: T_kasirUpdateTransaksiByID_body_7[]
}

export type T_kasirUpdateTransaksiByID = (request: {
  headers: T_kasirUpdateTransaksiByID_headers
  path: T_kasirUpdateTransaksiByID_path
  body: T_kasirUpdateTransaksiByID_body
}, response: Response) => Promise<Transaksi>;

export const method = 'put';
export const url_path = '/kasir/transaksi-hari-ini/:id';
export const alias = 'kasirUpdateTransaksiByID';
