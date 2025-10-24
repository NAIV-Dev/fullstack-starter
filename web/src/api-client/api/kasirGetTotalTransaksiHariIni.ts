
import { ItemDataKasirTotalHariIni } from '../schema/ItemDataKasirTotalHariIni'

export interface T_kasirGetTotalTransaksiHariIni_headers {
  authorization: string
}

export type T_kasirGetTotalTransaksiHariIni = (request: {
  headers: T_kasirGetTotalTransaksiHariIni_headers
}, base_url?: string) => Promise<ItemDataKasirTotalHariIni[]>;

export const method = 'get';
export const url_path = '/kasir/total-hari-ini';
export const alias = 'kasirGetTotalTransaksiHariIni';
