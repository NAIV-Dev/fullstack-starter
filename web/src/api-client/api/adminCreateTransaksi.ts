
import { Transaksi } from '../model/table/Transaksi'

export interface T_adminCreateTransaksi_headers {
  authorization: string
}
interface T_adminCreateTransaksi_body_2 {
  nama?: string
  nomor_hp?: string
  alamat?: string
}
interface T_adminCreateTransaksi_body_9 {
  layanan_id: number
  jumlah: number
}
export interface T_adminCreateTransaksi_body {
  pengguna_id?: number
  pelanggan_id?: number
  pelanggan_baru?: T_adminCreateTransaksi_body_2
  tanggal_transaksi: string
  metode_pembayaran: string
  sudah_lunas?: boolean
  sudah_diambil?: boolean
  total_harga: number
  catatan?: string
  items: T_adminCreateTransaksi_body_9[]
}

export type T_adminCreateTransaksi = (request: {
  headers: T_adminCreateTransaksi_headers
  body: T_adminCreateTransaksi_body
}, base_url?: string) => Promise<Transaksi>;

export const method = 'post';
export const url_path = '/admin/transaksi';
export const alias = 'adminCreateTransaksi';
