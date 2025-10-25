import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { AdminDashboardData } from '../schema/AdminDashboardData'

export class T_adminDashboard_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export type T_adminDashboard = (request: {
  headers: T_adminDashboard_headers
}, response: Response) => Promise<AdminDashboardData>;

export const method = 'get';
export const url_path = '/admin/dashboard';
export const alias = 'adminDashboard';
