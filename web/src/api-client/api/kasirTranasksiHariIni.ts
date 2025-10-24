
import { TransaksiFulldata } from '../schema/TransaksiFulldata'

export interface T_kasirTranasksiHariIni_headers {
  authorization: string
}

export type T_kasirTranasksiHariIni = (request: {
  headers: T_kasirTranasksiHariIni_headers
}, base_url?: string) => Promise<TransaksiFulldata[]>;

export const method = 'get';
export const url_path = '/kasir/transaksi-hari-ini';
export const alias = 'kasirTranasksiHariIni';
