
import { Layanan } from '../model/table/Layanan'

export interface T_adminUpdateLayananByID_headers {
  authorization: string
}
export interface T_adminUpdateLayananByID_path {
  id: number
}
export interface T_adminUpdateLayananByID_body {
  nama?: string
  label_satuan?: string
  harga_satuan?: number
  deskripsi?: string
  is_active?: boolean
}

export type T_adminUpdateLayananByID = (request: {
  headers: T_adminUpdateLayananByID_headers
  path: T_adminUpdateLayananByID_path
  body: T_adminUpdateLayananByID_body
}, base_url?: string) => Promise<Layanan>;

export const method = 'put';
export const url_path = '/admin/layanan/:id';
export const alias = 'adminUpdateLayananByID';
