import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ItemSetting } from '../schema/ItemSetting'

export class T_getSettingByKey_headers {
  @IsOptional()
  @IsString({ message: 'authorization must be a string' })
  authorization?: string
}
export class T_getSettingByKey_path {
  @IsNotEmpty({ message: 'key cannot be empty' })
  @IsString({ message: 'key must be a string' })
  key!: string
}

export type T_getSettingByKey = (request: {
  headers: T_getSettingByKey_headers
  path: T_getSettingByKey_path
}, response: Response) => Promise<ItemSetting>;

export const method = 'get';
export const url_path = '/setting/:key';
export const alias = 'getSettingByKey';
