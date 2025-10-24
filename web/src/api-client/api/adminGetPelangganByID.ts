
import { Pelanggan } from '../model/table/Pelanggan'

export interface T_adminGetPelangganByID_headers {
  authorization: string
}
export interface T_adminGetPelangganByID_path {
  id: number
}

export type T_adminGetPelangganByID = (request: {
  headers: T_adminGetPelangganByID_headers
  path: T_adminGetPelangganByID_path
}, base_url?: string) => Promise<Pelanggan>;

export const method = 'get';
export const url_path = '/admin/pelanggan/:id';
export const alias = 'adminGetPelangganByID';
