
import { User } from '../model/table/User'

export interface T_login_body {
  username: string
  password: string
}
interface ReturnType_0 {
  token: string
  user: User
}

export type T_login = (request: {
  body: T_login_body
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/login';
export const alias = 'login';
