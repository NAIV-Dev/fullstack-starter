import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ItemDataKasirTotalHariIni } from '../schema/ItemDataKasirTotalHariIni'

export class AdminDashboardData {
  @IsNotEmpty({ message: 'total_kasir cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_kasir must be a number (decimal)' })
  total_kasir!: number
  @IsNotEmpty({ message: 'total_layanan cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_layanan must be a number (decimal)' })
  total_layanan!: number
  @IsNotEmpty({ message: 'total_transaksi cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_transaksi must be a number (decimal)' })
  total_transaksi!: number
  @IsNotEmpty({ message: 'total_pendapatan cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_pendapatan must be a number (decimal)' })
  total_pendapatan!: number
  @IsNotEmpty({ message: 'total_keuntungan cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_keuntungan must be a number (decimal)' })
  total_keuntungan!: number
  @IsNotEmpty({ message: 'total_pengeluaran cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_pengeluaran must be a number (decimal)' })
  total_pengeluaran!: number
  @IsNotEmpty({ message: 'total_belum_ambil cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_belum_ambil must be a number (decimal)' })
  total_belum_ambil!: number
  @IsNotEmpty({ message: 'total_belum_bayar cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_belum_bayar must be a number (decimal)' })
  total_belum_bayar!: number
  @IsNotEmpty({ message: 'data_hari_ini cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDataKasirTotalHariIni)
  data_hari_ini!: ItemDataKasirTotalHariIni[]
}