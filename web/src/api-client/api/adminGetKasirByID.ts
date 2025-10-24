
import { User } from '../model/table/User'

export interface T_adminGetKasirByID_headers {
  authorization: string
}
export interface T_adminGetKasirByID_path {
  id: number
}

export type T_adminGetKasirByID = (request: {
  headers: T_adminGetKasirByID_headers
  path: T_adminGetKasirByID_path
}, base_url?: string) => Promise<User>;

export const method = 'get';
export const url_path = '/admin/kasir/:id';
export const alias = 'adminGetKasirByID';
