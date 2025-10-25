
import { Pengeluaran } from '../model/table/Pengeluaran'

export interface T_adminUpdatePengeluaranByID_headers {
  authorization: string
}
export interface T_adminUpdatePengeluaranByID_path {
  id: number
}
export interface T_adminUpdatePengeluaranByID_body {
  id_jenis_pengeluaran?: number
  tanggal?: string
  deskripsi?: string
  jumlah?: number
}

export type T_adminUpdatePengeluaranByID = (request: {
  headers: T_adminUpdatePengeluaranByID_headers
  path: T_adminUpdatePengeluaranByID_path
  body: T_adminUpdatePengeluaranByID_body
}, base_url?: string) => Promise<Pengeluaran>;

export const method = 'put';
export const url_path = '/admin/pengeluaran/:id';
export const alias = 'adminUpdatePengeluaranByID';
