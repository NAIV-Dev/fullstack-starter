
import { Transaksi } from '../model/table/Transaksi'

export interface T_adminUpdateTransaksiByID_headers {
  authorization: string
}
export interface T_adminUpdateTransaksiByID_path {
  id: number
}
interface T_adminUpdateTransaksiByID_body_2 {
  nama?: string
  nomor_hp?: string
  alamat?: string
}
interface T_adminUpdateTransaksiByID_body_9 {
  id?: number
  layanan_id: number
  jumlah: number
}
export interface T_adminUpdateTransaksiByID_body {
  pengguna_id?: number
  pelanggan_id?: number
  pelanggan_baru?: T_adminUpdateTransaksiByID_body_2
  tanggal_transaksi?: string
  metode_pembayaran?: string
  sudah_lunas?: boolean
  sudah_diambil?: boolean
  total_harga?: number
  catatan?: string
  items?: T_adminUpdateTransaksiByID_body_9[]
}

export type T_adminUpdateTransaksiByID = (request: {
  headers: T_adminUpdateTransaksiByID_headers
  path: T_adminUpdateTransaksiByID_path
  body: T_adminUpdateTransaksiByID_body
}, base_url?: string) => Promise<Transaksi>;

export const method = 'put';
export const url_path = '/admin/transaksi/:id';
export const alias = 'adminUpdateTransaksiByID';
