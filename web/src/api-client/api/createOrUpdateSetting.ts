

export interface T_createOrUpdateSetting_headers {
  authorization: string
}
interface T_createOrUpdateSetting_body_0 {
  key: string
  value: string
}
export interface T_createOrUpdateSetting_body {
  data: T_createOrUpdateSetting_body_0[]
}

export type T_createOrUpdateSetting = (request: {
  headers: T_createOrUpdateSetting_headers
  body: T_createOrUpdateSetting_body
}, base_url?: string) => Promise<boolean>;

export const method = 'post';
export const url_path = '/setting';
export const alias = 'createOrUpdateSetting';
