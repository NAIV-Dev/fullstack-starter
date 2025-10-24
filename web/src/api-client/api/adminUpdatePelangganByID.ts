
import { Pelanggan } from '../model/table/Pelanggan'

export interface T_adminUpdatePelangganByID_headers {
  authorization: string
}
export interface T_adminUpdatePelangganByID_path {
  id: number
}
export interface T_adminUpdatePelangganByID_body {
  nama?: string
  nomor_hp?: string
  alamat?: string
}

export type T_adminUpdatePelangganByID = (request: {
  headers: T_adminUpdatePelangganByID_headers
  path: T_adminUpdatePelangganByID_path
  body: T_adminUpdatePelangganByID_body
}, base_url?: string) => Promise<Pelanggan>;

export const method = 'put';
export const url_path = '/admin/pelanggan/:id';
export const alias = 'adminUpdatePelangganByID';
