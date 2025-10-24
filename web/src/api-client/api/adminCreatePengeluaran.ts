
import { Pengeluaran } from '../model/table/Pengeluaran'

export interface T_adminCreatePengeluaran_headers {
  authorization: string
}
export interface T_adminCreatePengeluaran_body {
  tanggal: string
  deskripsi: string
  jumlah: number
}

export type T_adminCreatePengeluaran = (request: {
  headers: T_adminCreatePengeluaran_headers
  body: T_adminCreatePengeluaran_body
}, base_url?: string) => Promise<Pengeluaran>;

export const method = 'post';
export const url_path = '/admin/pengeluaran';
export const alias = 'adminCreatePengeluaran';
