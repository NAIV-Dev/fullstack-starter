import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Transaksi } from '../model/table/Transaksi'
import { Pelanggan } from '../model/table/Pelanggan'
import { TransaksiDetail } from '../model/table/TransaksiDetail'

export class TransaksiFulldata {
  @IsNotEmpty({ message: 'transaksi cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => Transaksi)
  transaksi!: Transaksi
  @IsNotEmpty({ message: 'pelanggan cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => Pelanggan)
  pelanggan!: Pelanggan
  @IsNotEmpty({ message: 'list_item cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransaksiDetail)
  list_item!: TransaksiDetail[]
}