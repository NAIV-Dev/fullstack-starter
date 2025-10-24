
import { User } from '../model/table/User'

export interface T_adminUpdateKasirByID_headers {
  authorization: string
}
export interface T_adminUpdateKasirByID_path {
  id: number
}
export interface T_adminUpdateKasirByID_body {
  username?: string
  password?: string
  nama?: string
  is_active?: boolean
}

export type T_adminUpdateKasirByID = (request: {
  headers: T_adminUpdateKasirByID_headers
  path: T_adminUpdateKasirByID_path
  body: T_adminUpdateKasirByID_body
}, base_url?: string) => Promise<User>;

export const method = 'put';
export const url_path = '/admin/kasir/:id';
export const alias = 'adminUpdateKasirByID';
