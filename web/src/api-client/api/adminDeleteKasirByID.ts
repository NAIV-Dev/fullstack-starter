

export interface T_adminDeleteKasirByID_headers {
  authorization: string
}
export interface T_adminDeleteKasirByID_path {
  id: number
}

export type T_adminDeleteKasirByID = (request: {
  headers: T_adminDeleteKasirByID_headers
  path: T_adminDeleteKasirByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/kasir/:id';
export const alias = 'adminDeleteKasirByID';
