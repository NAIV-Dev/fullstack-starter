import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class ItemSetting {
  @IsNotEmpty({ message: 'key cannot be empty' })
  @IsString({ message: 'key must be a string' })
  key!: string
  @IsNotEmpty({ message: 'value cannot be empty' })
  @IsString({ message: 'value must be a string' })
  value!: string
}