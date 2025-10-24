
import { User } from '../model/table/User'

export interface T_adminProfile_headers {
  authorization: string
}

export type T_adminProfile = (request: {
  headers: T_adminProfile_headers
}, base_url?: string) => Promise<User>;

export const method = 'get';
export const url_path = '/admin/profile';
export const alias = 'adminProfile';
