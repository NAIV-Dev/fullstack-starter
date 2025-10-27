import { getAdminFromAuthHeader } from "../jwt";
import { PersistentDB } from "../persistent-db";
import { T_getSettingByKey } from "../types/api/getSettingByKey";

export const getSettingByKey: T_getSettingByKey = async req => {
  switch (req.path.key) {
    case 'zzzz':
      if (!req.headers.authorization) {
        return {
          key: req.path.key,
          value: ''
        };
      }
      await getAdminFromAuthHeader(req.headers.authorization);
      break;
  }
  return {
    key: req.path.key,
    value: await PersistentDB.get(req.path.key) as any
  };
}
