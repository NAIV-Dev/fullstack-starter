import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_adminDeleteJenisPengeluaranByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminDeleteJenisPengeluaranByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}

export type T_adminDeleteJenisPengeluaranByID = (request: {
  headers: T_adminDeleteJenisPengeluaranByID_headers
  path: T_adminDeleteJenisPengeluaranByID_path
}, response: Response) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/jenis-pengeluaran/:id';
export const alias = 'adminDeleteJenisPengeluaranByID';
