import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Layanan } from '../model/table/Layanan'

export class T_adminUpdateLayananByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdateLayananByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminUpdateLayananByID_body {
  @IsOptional()
  @IsString({ message: 'nama must be a string' })
  nama?: string
  @IsOptional()
  @IsString({ message: 'label_satuan must be a string' })
  label_satuan?: string
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'harga_satuan must be a number (decimal)' })
  harga_satuan?: number
  @IsOptional()
  @IsString({ message: 'deskripsi must be a string' })
  deskripsi?: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'is_active must be a boolean' })
  is_active?: boolean
}

export type T_adminUpdateLayananByID = (request: {
  headers: T_adminUpdateLayananByID_headers
  path: T_adminUpdateLayananByID_path
  body: T_adminUpdateLayananByID_body
}, response: Response) => Promise<Layanan>;

export const method = 'put';
export const url_path = '/admin/layanan/:id';
export const alias = 'adminUpdateLayananByID';
