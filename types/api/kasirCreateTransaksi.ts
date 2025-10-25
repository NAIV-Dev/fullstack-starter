import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Transaksi } from '../model/table/Transaksi'

export class T_kasirCreateTransaksi_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class T_kasirCreateTransaksi_body_1 {
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
class T_kasirCreateTransaksi_body_8 {
  @IsNotEmpty({ message: 'layanan_id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'layanan_id must be a number (decimal)' })
  layanan_id!: number
  @IsNotEmpty({ message: 'jumlah cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'jumlah must be a number (decimal)' })
  jumlah!: number
}
export class T_kasirCreateTransaksi_body {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'pelanggan_id must be a number (decimal)' })
  pelanggan_id?: number
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => T_kasirCreateTransaksi_body_1)
  pelanggan_baru?: T_kasirCreateTransaksi_body_1
  @IsNotEmpty({ message: 'tanggal_transaksi cannot be empty' })
  @IsString({ message: 'tanggal_transaksi must be a string' })
  tanggal_transaksi!: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'sudah_lunas must be a boolean' })
  sudah_lunas?: boolean
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'sudah_diambil must be a boolean' })
  sudah_diambil?: boolean
  @IsNotEmpty({ message: 'total_harga cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_harga must be a number (decimal)' })
  total_harga!: number
  @IsNotEmpty({ message: 'metode_pembayaran cannot be empty' })
  @IsString({ message: 'metode_pembayaran must be a string' })
  metode_pembayaran!: string
  @IsOptional()
  @IsString({ message: 'catatan must be a string' })
  catatan?: string
  @IsNotEmpty({ message: 'items cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => T_kasirCreateTransaksi_body_8)
  items!: T_kasirCreateTransaksi_body_8[]
}

export type T_kasirCreateTransaksi = (request: {
  headers: T_kasirCreateTransaksi_headers
  body: T_kasirCreateTransaksi_body
}, response: Response) => Promise<Transaksi>;

export const method = 'post';
export const url_path = '/kasir/transaksi-hari-ini';
export const alias = 'kasirCreateTransaksi';
