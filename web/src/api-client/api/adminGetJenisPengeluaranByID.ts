
import { JenisPengeluaran } from '../model/table/JenisPengeluaran'

export interface T_adminGetJenisPengeluaranByID_headers {
  authorization: string
}
export interface T_adminGetJenisPengeluaranByID_path {
  id: number
}

export type T_adminGetJenisPengeluaranByID = (request: {
  headers: T_adminGetJenisPengeluaranByID_headers
  path: T_adminGetJenisPengeluaranByID_path
}, base_url?: string) => Promise<JenisPengeluaran>;

export const method = 'get';
export const url_path = '/admin/jenis-pengeluaran/:id';
export const alias = 'adminGetJenisPengeluaranByID';
