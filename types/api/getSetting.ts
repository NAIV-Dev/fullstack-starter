import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ItemSetting } from '../schema/ItemSetting'

export class T_getSetting_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export type T_getSetting = (request: {
  headers: T_getSetting_headers
}, response: Response) => Promise<ItemSetting[]>;

export const method = 'get';
export const url_path = '/setting';
export const alias = 'getSetting';
