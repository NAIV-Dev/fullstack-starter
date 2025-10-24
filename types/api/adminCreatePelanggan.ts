import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pelanggan } from '../model/table/Pelanggan'

export class T_adminCreatePelanggan_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminCreatePelanggan_body {
  @IsNotEmpty({ message: 'nama cannot be empty' })
  @IsString({ message: 'nama must be a string' })
  nama!: string
  @IsOptional()
  @IsString({ message: 'nomor_hp must be a string' })
  nomor_hp?: string
  @IsOptional()
  @IsString({ message: 'alamat must be a string' })
  alamat?: string
}

export type T_adminCreatePelanggan = (request: {
  headers: T_adminCreatePelanggan_headers
  body: T_adminCreatePelanggan_body
}, response: Response) => Promise<Pelanggan>;

export const method = 'post';
export const url_path = '/admin/pelanggan';
export const alias = 'adminCreatePelanggan';
