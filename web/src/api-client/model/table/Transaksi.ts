import { Pelanggan } from '../../model/table/Pelanggan'
import { User } from '../../model/table/User'
import { MetodePembayaran } from '../../model/enum/MetodePembayaran'

export interface Transaksi {
  id: number;
  pelanggan_id?: number;
  otm_pelanggan_id?: Pelanggan;
  nomor_transaksi: string;
  pengguna_id: number;
  otm_pengguna_id?: User;
  tanggal_transaksi: Date;
  sudah_lunas?: boolean;
  sudah_diambil?: boolean;
  total_harga: number;
  catatan?: string;
  metode_pembayaran: MetodePembayaran;
  created_at: Date;
  deleted_at?: Date;
}