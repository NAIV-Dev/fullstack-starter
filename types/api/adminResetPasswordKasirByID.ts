import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_adminResetPasswordKasirByID_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminResetPasswordKasirByID_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminResetPasswordKasirByID_body {
  @IsNotEmpty({ message: 'new_password cannot be empty' })
  @IsString({ message: 'new_password must be a string' })
  new_password!: string
}

export type T_adminResetPasswordKasirByID = (request: {
  headers: T_adminResetPasswordKasirByID_headers
  path: T_adminResetPasswordKasirByID_path
  body: T_adminResetPasswordKasirByID_body
}, response: Response) => Promise<boolean>;

export const method = 'post';
export const url_path = '/admin/kasir/:id/reset-password';
export const alias = 'adminResetPasswordKasirByID';
