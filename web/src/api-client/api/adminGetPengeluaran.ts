
import { Pengeluaran } from '../model/table/Pengeluaran'

export interface T_adminGetPengeluaran_headers {
  authorization: string
}
export interface T_adminGetPengeluaran_query {
  keyword?: string
  limit?: number
  offset?: number
  tanggal_from?: string
  tanggal_to?: string
}
interface ReturnType_0 {
  total: number
  data: Pengeluaran[]
}

export type T_adminGetPengeluaran = (request: {
  headers: T_adminGetPengeluaran_headers
  query: T_adminGetPengeluaran_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/pengeluaran';
export const alias = 'adminGetPengeluaran';
