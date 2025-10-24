import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { User } from '../model/table/User'

export class T_adminUpdateProfile_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminUpdateProfile_body {
  @IsOptional()
  @IsString({ message: 'nama must be a string' })
  nama?: string
  @IsOptional()
  @IsString({ message: 'username must be a string' })
  username?: string
}

export type T_adminUpdateProfile = (request: {
  headers: T_adminUpdateProfile_headers
  body: T_adminUpdateProfile_body
}, response: Response) => Promise<User>;

export const method = 'put';
export const url_path = '/admin/profile';
export const alias = 'adminUpdateProfile';
