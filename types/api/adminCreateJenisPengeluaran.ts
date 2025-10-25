import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { JenisPengeluaran } from '../model/table/JenisPengeluaran'

export class T_adminCreateJenisPengeluaran_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminCreateJenisPengeluaran_body {
  @IsNotEmpty({ message: 'label cannot be empty' })
  @IsString({ message: 'label must be a string' })
  label!: string
  @IsOptional()
  @IsString({ message: 'deskripsi must be a string' })
  deskripsi?: string
}

export type T_adminCreateJenisPengeluaran = (request: {
  headers: T_adminCreateJenisPengeluaran_headers
  body: T_adminCreateJenisPengeluaran_body
}, response: Response) => Promise<JenisPengeluaran>;

export const method = 'post';
export const url_path = '/admin/jenis-pengeluaran';
export const alias = 'adminCreateJenisPengeluaran';
