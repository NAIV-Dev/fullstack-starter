
import { Layanan } from '../model/table/Layanan'

export interface T_adminCreateLayanan_headers {
  authorization: string
}
export interface T_adminCreateLayanan_body {
  nama: string
  label_satuan?: string
  harga_satuan: number
  deskripsi?: string
  is_active?: boolean
}

export type T_adminCreateLayanan = (request: {
  headers: T_adminCreateLayanan_headers
  body: T_adminCreateLayanan_body
}, base_url?: string) => Promise<Layanan>;

export const method = 'post';
export const url_path = '/admin/layanan';
export const alias = 'adminCreateLayanan';
