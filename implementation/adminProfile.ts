import { getAdminFromAuthHeader } from "../jwt";
import { T_adminProfile } from "../types/api/adminProfile";

export const adminProfile: T_adminProfile = async req => {
  return await getAdminFromAuthHeader(req.headers.authorization);
}
