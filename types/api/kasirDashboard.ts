import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_kasirDashboard_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class ReturnType_0 {
  @IsNotEmpty({ message: 'transaksi_hari_ini cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'transaksi_hari_ini must be a number (decimal)' })
  transaksi_hari_ini!: number
  @IsNotEmpty({ message: 'total_pendapatan_hari_ini cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total_pendapatan_hari_ini must be a number (decimal)' })
  total_pendapatan_hari_ini!: number
}

export type T_kasirDashboard = (request: {
  headers: T_kasirDashboard_headers
}, response: Response) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/kasir/dashboard';
export const alias = 'kasirDashboard';
