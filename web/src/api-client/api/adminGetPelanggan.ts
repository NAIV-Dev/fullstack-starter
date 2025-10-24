
import { Pelanggan } from '../model/table/Pelanggan'

export interface T_adminGetPelanggan_headers {
  authorization: string
}
export interface T_adminGetPelanggan_query {
  keyword?: string
  limit?: number
  offset?: number
}
interface ReturnType_0 {
  total: number
  data: Pelanggan[]
}

export type T_adminGetPelanggan = (request: {
  headers: T_adminGetPelanggan_headers
  query: T_adminGetPelanggan_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/pelanggan';
export const alias = 'adminGetPelanggan';
