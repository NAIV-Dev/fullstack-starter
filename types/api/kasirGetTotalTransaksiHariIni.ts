import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ItemDataKasirTotalHariIni } from '../schema/ItemDataKasirTotalHariIni'

export class T_kasirGetTotalTransaksiHariIni_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export type T_kasirGetTotalTransaksiHariIni = (request: {
  headers: T_kasirGetTotalTransaksiHariIni_headers
}, response: Response) => Promise<ItemDataKasirTotalHariIni[]>;

export const method = 'get';
export const url_path = '/kasir/total-hari-ini';
export const alias = 'kasirGetTotalTransaksiHariIni';
