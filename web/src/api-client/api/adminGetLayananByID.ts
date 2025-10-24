
import { Layanan } from '../model/table/Layanan'

export interface T_adminGetLayananByID_headers {
  authorization: string
}
export interface T_adminGetLayananByID_path {
  id: number
}

export type T_adminGetLayananByID = (request: {
  headers: T_adminGetLayananByID_headers
  path: T_adminGetLayananByID_path
}, base_url?: string) => Promise<Layanan>;

export const method = 'get';
export const url_path = '/admin/layanan/:id';
export const alias = 'adminGetLayananByID';
