

export interface T_adminUpdatePassword_headers {
  authorization: string
}
export interface T_adminUpdatePassword_body {
  old_password: string
  new_password: string
}

export type T_adminUpdatePassword = (request: {
  headers: T_adminUpdatePassword_headers
  body: T_adminUpdatePassword_body
}, base_url?: string) => Promise<boolean>;

export const method = 'put';
export const url_path = '/admin/password';
export const alias = 'adminUpdatePassword';
