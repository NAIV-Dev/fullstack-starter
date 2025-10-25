
import { JenisPengeluaran } from '../model/table/JenisPengeluaran'

export interface T_adminCreateJenisPengeluaran_headers {
  authorization: string
}
export interface T_adminCreateJenisPengeluaran_body {
  label: string
  deskripsi?: string
}

export type T_adminCreateJenisPengeluaran = (request: {
  headers: T_adminCreateJenisPengeluaran_headers
  body: T_adminCreateJenisPengeluaran_body
}, base_url?: string) => Promise<JenisPengeluaran>;

export const method = 'post';
export const url_path = '/admin/jenis-pengeluaran';
export const alias = 'adminCreateJenisPengeluaran';
