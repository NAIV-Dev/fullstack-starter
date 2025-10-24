import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pengeluaran } from '../model/table/Pengeluaran'

export class T_adminGetPengeluaranByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminGetPengeluaranByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}

export type T_adminGetPengeluaranByID = (request: {
  headers: T_adminGetPengeluaranByID_headers
  path: T_adminGetPengeluaranByID_path
}, response: Response) => Promise<Pengeluaran>;

export const method = 'get';
export const url_path = '/admin/pengeluaran/:id';
export const alias = 'adminGetPengeluaranByID';
