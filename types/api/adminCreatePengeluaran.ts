import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pengeluaran } from '../model/table/Pengeluaran'

export class T_adminCreatePengeluaran_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminCreatePengeluaran_body {
  @IsNotEmpty({ message: 'id_jenis_pengeluaran cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_jenis_pengeluaran must be a number (decimal)' })
  id_jenis_pengeluaran!: number
  @IsNotEmpty({ message: 'tanggal cannot be empty' })
  @IsString({ message: 'tanggal must be a string' })
  tanggal!: string
  @IsOptional()
  @IsString({ message: 'deskripsi must be a string' })
  deskripsi?: string
  @IsNotEmpty({ message: 'jumlah cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'jumlah must be a number (decimal)' })
  jumlah!: number
}

export type T_adminCreatePengeluaran = (request: {
  headers: T_adminCreatePengeluaran_headers
  body: T_adminCreatePengeluaran_body
}, response: Response) => Promise<Pengeluaran>;

export const method = 'post';
export const url_path = '/admin/pengeluaran';
export const alias = 'adminCreatePengeluaran';
