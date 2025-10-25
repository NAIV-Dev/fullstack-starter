
import { JenisPengeluaran } from '../model/table/JenisPengeluaran'

export interface T_adminUpdateJenisPengeluaranByID_headers {
  authorization: string
}
export interface T_adminUpdateJenisPengeluaranByID_path {
  id: number
}
export interface T_adminUpdateJenisPengeluaranByID_body {
  label?: string
  deskripsi?: string
}

export type T_adminUpdateJenisPengeluaranByID = (request: {
  headers: T_adminUpdateJenisPengeluaranByID_headers
  path: T_adminUpdateJenisPengeluaranByID_path
  body: T_adminUpdateJenisPengeluaranByID_body
}, base_url?: string) => Promise<JenisPengeluaran>;

export const method = 'put';
export const url_path = '/admin/jenis-pengeluaran/:id';
export const alias = 'adminUpdateJenisPengeluaranByID';
