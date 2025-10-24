import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Pengeluaran } from '../model/table/Pengeluaran'

export class T_adminGetPengeluaran_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminGetPengeluaran_query {
  @IsOptional()
  @IsString({ message: 'keyword must be a string' })
  keyword?: string
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'limit must be a number (decimal)' })
  limit?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'offset must be a number (decimal)' })
  offset?: number
  @IsOptional()
  @IsString({ message: 'tanggal_from must be a string' })
  tanggal_from?: string
  @IsOptional()
  @IsString({ message: 'tanggal_to must be a string' })
  tanggal_to?: string
}
class ReturnType_0 {
  @IsNotEmpty({ message: 'total cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total must be a number (decimal)' })
  total!: number
  @IsNotEmpty({ message: 'data cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Pengeluaran)
  data!: Pengeluaran[]
}

export type T_adminGetPengeluaran = (request: {
  headers: T_adminGetPengeluaran_headers
  query: T_adminGetPengeluaran_query
}, response: Response) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/pengeluaran';
export const alias = 'adminGetPengeluaran';
