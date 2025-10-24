import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdatePassword } from "../types/api/adminUpdatePassword";
import bcrypt from 'bcrypt';

export const adminUpdatePassword: T_adminUpdatePassword = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  if (!await bcrypt.compare(req.body.old_password, admin.password)) {
    throw new Error(`old password incorrect`);
  }
  admin.password = await bcrypt.hash(req.body.new_password, 10);
  await admin.save();
  return true;
}
