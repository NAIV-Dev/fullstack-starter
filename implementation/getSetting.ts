import { getAdminFromAuthHeader } from "../jwt";
import { PersistentDB } from "../persistent-db";
import { T_getSetting } from "../types/api/getSetting";

export const getSetting: T_getSetting = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const obj = await PersistentDB.getAll();
  return Object.keys(obj).map(key => ({
    key,
    value: obj[key] as any
  }));
}
