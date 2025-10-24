

export interface T_adminDeletePengeluaranByID_headers {
  authorization: string
}
export interface T_adminDeletePengeluaranByID_path {
  id: number
}

export type T_adminDeletePengeluaranByID = (request: {
  headers: T_adminDeletePengeluaranByID_headers
  path: T_adminDeletePengeluaranByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/pengeluaran/:id';
export const alias = 'adminDeletePengeluaranByID';
