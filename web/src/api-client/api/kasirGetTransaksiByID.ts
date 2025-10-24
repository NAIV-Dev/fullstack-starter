
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export interface T_kasirGetTransaksiByID_headers {
  authorization: string
}
export interface T_kasirGetTransaksiByID_path {
  id: number
}

export type T_kasirGetTransaksiByID = (request: {
  headers: T_kasirGetTransaksiByID_headers
  path: T_kasirGetTransaksiByID_path
}, base_url?: string) => Promise<TransaksiFulldata>;

export const method = 'get';
export const url_path = '/kasir/transaksi-hari-ini/:id';
export const alias = 'kasirGetTransaksiByID';
