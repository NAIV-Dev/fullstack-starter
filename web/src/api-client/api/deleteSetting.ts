

export interface T_deleteSetting_headers {
  authorization: string
}
export interface T_deleteSetting_path {
  key: string
}

export type T_deleteSetting = (request: {
  headers: T_deleteSetting_headers
  path: T_deleteSetting_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/setting/:key';
export const alias = 'deleteSetting';
