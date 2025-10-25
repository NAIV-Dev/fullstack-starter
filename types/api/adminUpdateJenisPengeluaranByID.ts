import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { JenisPengeluaran } from '../model/table/JenisPengeluaran'

export class T_adminUpdateJenisPengeluaranByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdateJenisPengeluaranByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminUpdateJenisPengeluaranByID_body {
  @IsOptional()
  @IsString({ message: 'label must be a string' })
  label?: string
  @IsOptional()
  @IsString({ message: 'deskripsi must be a string' })
  deskripsi?: string
}

export type T_adminUpdateJenisPengeluaranByID = (request: {
  headers: T_adminUpdateJenisPengeluaranByID_headers
  path: T_adminUpdateJenisPengeluaranByID_path
  body: T_adminUpdateJenisPengeluaranByID_body
}, response: Response) => Promise<JenisPengeluaran>;

export const method = 'put';
export const url_path = '/admin/jenis-pengeluaran/:id';
export const alias = 'adminUpdateJenisPengeluaranByID';
