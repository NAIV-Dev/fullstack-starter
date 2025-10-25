
import { JenisPengeluaran } from '../model/table/JenisPengeluaran'

export interface T_adminGetJenisPengeluaran_headers {
  authorization: string
}
export interface T_adminGetJenisPengeluaran_query {
  keyword?: string
  limit?: number
  offset?: number
}
interface ReturnType_0 {
  total: number
  data: JenisPengeluaran[]
}

export type T_adminGetJenisPengeluaran = (request: {
  headers: T_adminGetJenisPengeluaran_headers
  query: T_adminGetJenisPengeluaran_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/jenis-pengeluaran';
export const alias = 'adminGetJenisPengeluaran';
