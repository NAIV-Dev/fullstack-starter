
import { User } from '../model/table/User'

export interface T_adminCreateKasir_headers {
  authorization: string
}
export interface T_adminCreateKasir_body {
  username: string
  password: string
  nama: string
  is_active?: boolean
}

export type T_adminCreateKasir = (request: {
  headers: T_adminCreateKasir_headers
  body: T_adminCreateKasir_body
}, base_url?: string) => Promise<User>;

export const method = 'post';
export const url_path = '/admin/kasir';
export const alias = 'adminCreateKasir';
