
import { User } from '../model/table/User'

export interface T_adminUpdateProfile_headers {
  authorization: string
}
export interface T_adminUpdateProfile_body {
  nama?: string
  username?: string
}

export type T_adminUpdateProfile = (request: {
  headers: T_adminUpdateProfile_headers
  body: T_adminUpdateProfile_body
}, base_url?: string) => Promise<User>;

export const method = 'put';
export const url_path = '/admin/profile';
export const alias = 'adminUpdateProfile';
