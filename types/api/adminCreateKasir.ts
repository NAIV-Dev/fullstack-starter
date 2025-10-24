import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { User } from '../model/table/User'

export class T_adminCreateKasir_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminCreateKasir_body {
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username must be a string' })
  username!: string
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString({ message: 'password must be a string' })
  password!: string
  @IsNotEmpty({ message: 'nama cannot be empty' })
  @IsString({ message: 'nama must be a string' })
  nama!: string
  @IsOptional()
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'is_active must be a boolean' })
  is_active?: boolean
}

export type T_adminCreateKasir = (request: {
  headers: T_adminCreateKasir_headers
  body: T_adminCreateKasir_body
}, response: Response) => Promise<User>;

export const method = 'post';
export const url_path = '/admin/kasir';
export const alias = 'adminCreateKasir';
