
import { ItemSetting } from '../schema/ItemSetting'

export interface T_getSetting_headers {
  authorization: string
}

export type T_getSetting = (request: {
  headers: T_getSetting_headers
}, base_url?: string) => Promise<ItemSetting[]>;

export const method = 'get';
export const url_path = '/setting';
export const alias = 'getSetting';
