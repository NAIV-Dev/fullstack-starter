
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export interface T_adminGetTransaksiByID_headers {
  authorization: string
}
export interface T_adminGetTransaksiByID_path {
  id: number
}

export type T_adminGetTransaksiByID = (request: {
  headers: T_adminGetTransaksiByID_headers
  path: T_adminGetTransaksiByID_path
}, base_url?: string) => Promise<TransaksiFulldata>;

export const method = 'get';
export const url_path = '/admin/transaksi/:id';
export const alias = 'adminGetTransaksiByID';
