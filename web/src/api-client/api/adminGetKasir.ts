
import { User } from '../model/table/User'

export interface T_adminGetKasir_headers {
  authorization: string
}
export interface T_adminGetKasir_query {
  keyword?: string
  limit?: number
  offset?: number
}
interface ReturnType_0 {
  total: number
  data: User[]
}

export type T_adminGetKasir = (request: {
  headers: T_adminGetKasir_headers
  query: T_adminGetKasir_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/kasir';
export const alias = 'adminGetKasir';
