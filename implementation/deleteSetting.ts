import { getAdminFromAuthHeader } from "../jwt";
import { PersistentDB } from "../persistent-db";
import { T_deleteSetting } from "../types/api/deleteSetting";

export const deleteSetting: T_deleteSetting = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  await PersistentDB.store(req.path.key, '');
  return true;
}
