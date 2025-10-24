

export interface T_adminResetPasswordKasirByID_headers {
  authorization: string
}
export interface T_adminResetPasswordKasirByID_path {
  id: number
}
export interface T_adminResetPasswordKasirByID_body {
  new_password: string
}

export type T_adminResetPasswordKasirByID = (request: {
  headers: T_adminResetPasswordKasirByID_headers
  path: T_adminResetPasswordKasirByID_path
  body: T_adminResetPasswordKasirByID_body
}, base_url?: string) => Promise<boolean>;

export const method = 'post';
export const url_path = '/admin/kasir/:id/reset-password';
export const alias = 'adminResetPasswordKasirByID';
