

export interface T_adminDeletePelangganByID_headers {
  authorization: string
}
export interface T_adminDeletePelangganByID_path {
  id: number
}

export type T_adminDeletePelangganByID = (request: {
  headers: T_adminDeletePelangganByID_headers
  path: T_adminDeletePelangganByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/pelanggan/:id';
export const alias = 'adminDeletePelangganByID';
