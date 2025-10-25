
import { Pelanggan } from '../model/table/Pelanggan'

export interface T_kasirGetPelanggan_headers {
  authorization: string
}
export interface T_kasirGetPelanggan_query {
  keyword?: string
  limit?: number
  offset?: number
}
interface ReturnType_0 {
  total: number
  data: Pelanggan[]
}

export type T_kasirGetPelanggan = (request: {
  headers: T_kasirGetPelanggan_headers
  query: T_kasirGetPelanggan_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/kasir/pelanggan';
export const alias = 'kasirGetPelanggan';
