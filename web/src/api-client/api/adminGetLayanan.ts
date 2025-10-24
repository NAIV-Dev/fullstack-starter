
import { Layanan } from '../model/table/Layanan'

export interface T_adminGetLayanan_headers {
  authorization: string
}
export interface T_adminGetLayanan_query {
  keyword?: string
  limit?: number
  offset?: number
  is_active?: boolean
}
interface ReturnType_0 {
  total: number
  data: Layanan[]
}

export type T_adminGetLayanan = (request: {
  headers: T_adminGetLayanan_headers
  query: T_adminGetLayanan_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/layanan';
export const alias = 'adminGetLayanan';
