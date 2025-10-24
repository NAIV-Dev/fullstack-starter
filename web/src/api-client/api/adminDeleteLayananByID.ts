

export interface T_adminDeleteLayananByID_headers {
  authorization: string
}
export interface T_adminDeleteLayananByID_path {
  id: number
}

export type T_adminDeleteLayananByID = (request: {
  headers: T_adminDeleteLayananByID_headers
  path: T_adminDeleteLayananByID_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/admin/layanan/:id';
export const alias = 'adminDeleteLayananByID';
