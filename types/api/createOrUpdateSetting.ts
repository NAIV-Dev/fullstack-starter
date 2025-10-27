import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_createOrUpdateSetting_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class T_createOrUpdateSetting_body_0 {
  @IsNotEmpty({ message: 'key cannot be empty' })
  @IsString({ message: 'key must be a string' })
  key!: string
  @IsNotEmpty({ message: 'value cannot be empty' })
  @IsString({ message: 'value must be a string' })
  value!: string
}
export class T_createOrUpdateSetting_body {
  @IsNotEmpty({ message: 'data cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => T_createOrUpdateSetting_body_0)
  data!: T_createOrUpdateSetting_body_0[]
}

export type T_createOrUpdateSetting = (request: {
  headers: T_createOrUpdateSetting_headers
  body: T_createOrUpdateSetting_body
}, response: Response) => Promise<boolean>;

export const method = 'post';
export const url_path = '/setting';
export const alias = 'createOrUpdateSetting';
