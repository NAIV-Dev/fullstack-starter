import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export class T_kasirTranasksiHariIni_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export type T_kasirTranasksiHariIni = (request: {
  headers: T_kasirTranasksiHariIni_headers
}, response: Response) => Promise<TransaksiFulldata[]>;

export const method = 'get';
export const url_path = '/kasir/transaksi-hari-ini';
export const alias = 'kasirTranasksiHariIni';
