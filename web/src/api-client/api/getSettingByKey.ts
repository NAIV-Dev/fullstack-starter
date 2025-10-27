
import { ItemSetting } from '../schema/ItemSetting'

export interface T_getSettingByKey_headers {
  authorization?: string
}
export interface T_getSettingByKey_path {
  key: string
}

export type T_getSettingByKey = (request: {
  headers: T_getSettingByKey_headers
  path: T_getSettingByKey_path
}, base_url?: string) => Promise<ItemSetting>;

export const method = 'get';
export const url_path = '/setting/:key';
export const alias = 'getSettingByKey';
