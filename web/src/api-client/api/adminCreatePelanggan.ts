
import { Pelanggan } from '../model/table/Pelanggan'

export interface T_adminCreatePelanggan_headers {
  authorization: string
}
export interface T_adminCreatePelanggan_body {
  nama: string
  nomor_hp?: string
  alamat?: string
}

export type T_adminCreatePelanggan = (request: {
  headers: T_adminCreatePelanggan_headers
  body: T_adminCreatePelanggan_body
}, base_url?: string) => Promise<Pelanggan>;

export const method = 'post';
export const url_path = '/admin/pelanggan';
export const alias = 'adminCreatePelanggan';
