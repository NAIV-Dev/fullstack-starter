import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pelanggan } from '../model/table/Pelanggan'

export class T_adminUpdatePelangganByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdatePelangganByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminUpdatePelangganByID_body {
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

export type T_adminUpdatePelangganByID = (request: {
  headers: T_adminUpdatePelangganByID_headers
  path: T_adminUpdatePelangganByID_path
  body: T_adminUpdatePelangganByID_body
}, response: Response) => Promise<Pelanggan>;

export const method = 'put';
export const url_path = '/admin/pelanggan/:id';
export const alias = 'adminUpdatePelangganByID';
