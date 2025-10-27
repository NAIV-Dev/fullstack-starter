import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_deleteSetting_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_deleteSetting_path {
  @IsNotEmpty({ message: 'key cannot be empty' })
  @IsString({ message: 'key must be a string' })
  key!: string
}

export type T_deleteSetting = (request: {
  headers: T_deleteSetting_headers
  path: T_deleteSetting_path
}, response: Response) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/setting/:key';
export const alias = 'deleteSetting';
