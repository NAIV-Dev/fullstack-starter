import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export class T_adminGetTransaksi_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminGetTransaksi_query {
  @IsOptional()
  @IsString({ message: 'keyword must be a string' })
  keyword?: string
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'limit must be a number (decimal)' })
  limit?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'offset must be a number (decimal)' })
  offset?: number
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
  @IsString({ message: 'filter_tanggal_from must be a string' })
  filter_tanggal_from?: string
  @IsOptional()
  @IsString({ message: 'filter_tanggal_to must be a string' })
  filter_tanggal_to?: string
  @IsOptional()
  @IsString({ message: 'filter_picked_up_tanggal_from must be a string' })
  filter_picked_up_tanggal_from?: string
  @IsOptional()
  @IsString({ message: 'filter_picked_up_tanggal_to must be a string' })
  filter_picked_up_tanggal_to?: string
  @IsOptional()
  @IsString({ message: 'filter_paid_tanggal_from must be a string' })
  filter_paid_tanggal_from?: string
  @IsOptional()
  @IsString({ message: 'filter_paid_tanggal_to must be a string' })
  filter_paid_tanggal_to?: string
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'filter_pelanggan_id must be a number (decimal)' })
  filter_pelanggan_id?: number
  @IsOptional()
  @IsString({ message: 'filter_metode_pembayaran_csv must be a string' })
  filter_metode_pembayaran_csv?: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'filter_sudah_lunas must be a boolean' })
  filter_sudah_lunas?: boolean
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'filter_sudah_diambil must be a boolean' })
  filter_sudah_diambil?: boolean
}
class ReturnType_0 {
  @IsNotEmpty({ message: 'total cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total must be a number (decimal)' })
  total!: number
  @IsNotEmpty({ message: 'data cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransaksiFulldata)
  data!: TransaksiFulldata[]
}

export type T_adminGetTransaksi = (request: {
  headers: T_adminGetTransaksi_headers
  query: T_adminGetTransaksi_query
}, response: Response) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/transaksi';
export const alias = 'adminGetTransaksi';
