import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export class T_kasirGetTransaksiByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_kasirGetTransaksiByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}

export type T_kasirGetTransaksiByID = (request: {
  headers: T_kasirGetTransaksiByID_headers
  path: T_kasirGetTransaksiByID_path
}, response: Response) => Promise<TransaksiFulldata>;

export const method = 'get';
export const url_path = '/kasir/transaksi-hari-ini/:id';
export const alias = 'kasirGetTransaksiByID';
