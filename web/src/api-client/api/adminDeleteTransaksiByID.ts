

export interface T_adminDeleteTransaksiByID_headers {
  authorization: string
}
export interface T_adminDeleteTransaksiByID_path {
  id: number
}

export type T_adminDeleteTransaksiByID = (request: {
  headers: T_adminDeleteTransaksiByID_headers
  path: T_adminDeleteTransaksiByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/transaksi/:id';
export const alias = 'adminDeleteTransaksiByID';
