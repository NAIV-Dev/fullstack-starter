

export interface T_adminDeleteJenisPengeluaranByID_headers {
  authorization: string
}
export interface T_adminDeleteJenisPengeluaranByID_path {
  id: number
}

export type T_adminDeleteJenisPengeluaranByID = (request: {
  headers: T_adminDeleteJenisPengeluaranByID_headers
  path: T_adminDeleteJenisPengeluaranByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/jenis-pengeluaran/:id';
export const alias = 'adminDeleteJenisPengeluaranByID';
