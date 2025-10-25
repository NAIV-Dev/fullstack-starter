import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pengeluaran } from '../model/table/Pengeluaran'

export class T_adminUpdatePengeluaranByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdatePengeluaranByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminUpdatePengeluaranByID_body {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_jenis_pengeluaran must be a number (decimal)' })
  id_jenis_pengeluaran?: number
  @IsOptional()
  @IsString({ message: 'tanggal must be a string' })
  tanggal?: string
  @IsOptional()
  @IsString({ message: 'deskripsi must be a string' })
  deskripsi?: string
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'jumlah must be a number (decimal)' })
  jumlah?: number
}

export type T_adminUpdatePengeluaranByID = (request: {
  headers: T_adminUpdatePengeluaranByID_headers
  path: T_adminUpdatePengeluaranByID_path
  body: T_adminUpdatePengeluaranByID_body
}, response: Response) => Promise<Pengeluaran>;

export const method = 'put';
export const url_path = '/admin/pengeluaran/:id';
export const alias = 'adminUpdatePengeluaranByID';
