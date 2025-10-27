import { getAdminFromAuthHeader } from "../jwt";
import { PersistentDB } from "../persistent-db";
import { T_createOrUpdateSetting } from "../types/api/createOrUpdateSetting";

export const createOrUpdateSetting: T_createOrUpdateSetting = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  for (const item of req.body.data) {
    await PersistentDB.store(item.key, item.value);
  }
  return true;
}
