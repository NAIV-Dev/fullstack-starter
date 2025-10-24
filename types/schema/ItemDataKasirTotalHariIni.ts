import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class ItemDataKasirTotalHariIni {
  @IsNotEmpty({ message: 'nama_layanan cannot be empty' })
  @IsString({ message: 'nama_layanan must be a string' })
  nama_layanan!: string
  @IsNotEmpty({ message: 'label_satuan cannot be empty' })
  @IsString({ message: 'label_satuan must be a string' })
  label_satuan!: string
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'jumlah must be a number (decimal)' })
  jumlah?: number
}