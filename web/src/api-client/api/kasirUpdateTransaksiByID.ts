
import { Transaksi } from '../model/table/Transaksi'

export interface T_kasirUpdateTransaksiByID_headers {
  authorization: string
}
export interface T_kasirUpdateTransaksiByID_path {
  id: number
}
interface T_kasirUpdateTransaksiByID_body_7 {
  id?: number
  layanan_id: number
  jumlah: number
}
export interface T_kasirUpdateTransaksiByID_body {
  pelanggan_id: number
  tanggal_transaksi?: string
  sudah_lunas?: boolean
  sudah_diambil?: boolean
  metode_pembayaran?: string
  total_harga?: number
  catatan?: string
  items?: T_kasirUpdateTransaksiByID_body_7[]
}

export type T_kasirUpdateTransaksiByID = (request: {
  headers: T_kasirUpdateTransaksiByID_headers
  path: T_kasirUpdateTransaksiByID_path
  body: T_kasirUpdateTransaksiByID_body
}, base_url?: string) => Promise<Transaksi>;

export const method = 'put';
export const url_path = '/kasir/transaksi-hari-ini/:id';
export const alias = 'kasirUpdateTransaksiByID';
