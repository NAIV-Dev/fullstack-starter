import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdateProfile } from "../types/api/adminUpdateProfile";

export const adminUpdateProfile: T_adminUpdateProfile = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  admin.nama = req.body.nama ?? admin.nama;
  admin.username = req.body.username ?? admin.username;
  return admin.save();
}
