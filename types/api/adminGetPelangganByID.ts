import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pelanggan } from '../model/table/Pelanggan'

export class T_adminGetPelangganByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminGetPelangganByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}

export type T_adminGetPelangganByID = (request: {
  headers: T_adminGetPelangganByID_headers
  path: T_adminGetPelangganByID_path
}, response: Response) => Promise<Pelanggan>;

export const method = 'get';
export const url_path = '/admin/pelanggan/:id';
export const alias = 'adminGetPelangganByID';
