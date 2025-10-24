

export interface T_kasirDeleteTransaksiByID_headers {
  authorization: string
}
export interface T_kasirDeleteTransaksiByID_path {
  id: number
}

export type T_kasirDeleteTransaksiByID = (request: {
  headers: T_kasirDeleteTransaksiByID_headers
  path: T_kasirDeleteTransaksiByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/kasir/transaksi-hari-ini/:id';
export const alias = 'kasirDeleteTransaksiByID';
