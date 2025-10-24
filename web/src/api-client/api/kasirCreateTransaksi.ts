
import { Transaksi } from '../model/table/Transaksi'

export interface T_kasirCreateTransaksi_headers {
  authorization: string
}
interface T_kasirCreateTransaksi_body_7 {
  layanan_id: number
  jumlah: number
}
export interface T_kasirCreateTransaksi_body {
  pelanggan_id: number
  tanggal_transaksi: string
  sudah_lunas?: boolean
  sudah_diambil?: boolean
  total_harga: number
  metode_pembayaran: string
  catatan?: string
  items: T_kasirCreateTransaksi_body_7[]
}

export type T_kasirCreateTransaksi = (request: {
  headers: T_kasirCreateTransaksi_headers
  body: T_kasirCreateTransaksi_body
}, base_url?: string) => Promise<Transaksi>;

export const method = 'post';
export const url_path = '/kasir/transaksi-hari-ini';
export const alias = 'kasirCreateTransaksi';
