import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_adminUpdatePassword_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdatePassword_body {
  @IsNotEmpty({ message: 'old_password cannot be empty' })
  @IsString({ message: 'old_password must be a string' })
  old_password!: string
  @IsNotEmpty({ message: 'new_password cannot be empty' })
  @IsString({ message: 'new_password must be a string' })
  new_password!: string
}

export type T_adminUpdatePassword = (request: {
  headers: T_adminUpdatePassword_headers
  body: T_adminUpdatePassword_body
}, response: Response) => Promise<boolean>;

export const method = 'put';
export const url_path = '/admin/password';
export const alias = 'adminUpdatePassword';
