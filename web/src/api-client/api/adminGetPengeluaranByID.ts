
import { Pengeluaran } from '../model/table/Pengeluaran'

export interface T_adminGetPengeluaranByID_headers {
  authorization: string
}
export interface T_adminGetPengeluaranByID_path {
  id: number
}

export type T_adminGetPengeluaranByID = (request: {
  headers: T_adminGetPengeluaranByID_headers
  path: T_adminGetPengeluaranByID_path
}, base_url?: string) => Promise<Pengeluaran>;

export const method = 'get';
export const url_path = '/admin/pengeluaran/:id';
export const alias = 'adminGetPengeluaranByID';
