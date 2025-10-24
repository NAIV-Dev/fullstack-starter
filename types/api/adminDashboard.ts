import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_adminDashboard_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class ReturnType_0 {
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
  @IsNotEmpty({ message: 'total_pengeluaran cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_pengeluaran must be a number (decimal)' })
  total_pengeluaran!: number
}

export type T_adminDashboard = (request: {
  headers: T_adminDashboard_headers
}, response: Response) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/dashboard';
export const alias = 'adminDashboard';
