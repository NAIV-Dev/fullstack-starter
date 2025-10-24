import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Layanan } from '../model/table/Layanan'

export class T_adminGetLayananByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminGetLayananByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}

export type T_adminGetLayananByID = (request: {
  headers: T_adminGetLayananByID_headers
  path: T_adminGetLayananByID_path
}, response: Response) => Promise<Layanan>;

export const method = 'get';
export const url_path = '/admin/layanan/:id';
export const alias = 'adminGetLayananByID';
