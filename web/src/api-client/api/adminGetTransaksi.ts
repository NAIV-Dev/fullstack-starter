
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export interface T_adminGetTransaksi_headers {
  authorization: string
}
export interface T_adminGetTransaksi_query {
  keyword?: string
  limit?: number
  offset?: number
  sudah_lunas?: boolean
  sudah_diambil?: boolean
  metode_pembayaran?: string
  filter_tanggal_from?: string
  filter_tanggal_to?: string
  filter_pelanggan_id?: number
  filter_metode_pembayaran?: string
  filter_sudah_lunas?: boolean
  filter_sudah_diambil?: boolean
}
interface ReturnType_0 {
  total: number
  data: TransaksiFulldata[]
}

export type T_adminGetTransaksi = (request: {
  headers: T_adminGetTransaksi_headers
  query: T_adminGetTransaksi_query
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/transaksi';
export const alias = 'adminGetTransaksi';
