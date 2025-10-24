import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { User } from '../model/table/User'

export class T_adminUpdateKasirByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdateKasirByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminUpdateKasirByID_body {
  @IsOptional()
  @IsString({ message: 'username must be a string' })
  username?: string
  @IsOptional()
  @IsString({ message: 'password must be a string' })
  password?: string
  @IsOptional()
  @IsString({ message: 'nama must be a string' })
  nama?: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'is_active must be a boolean' })
  is_active?: boolean
}

export type T_adminUpdateKasirByID = (request: {
  headers: T_adminUpdateKasirByID_headers
  path: T_adminUpdateKasirByID_path
  body: T_adminUpdateKasirByID_body
}, response: Response) => Promise<User>;

export const method = 'put';
export const url_path = '/admin/kasir/:id';
export const alias = 'adminUpdateKasirByID';
