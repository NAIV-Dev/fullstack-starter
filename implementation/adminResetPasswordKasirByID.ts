import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminResetPasswordKasirByID } from "../types/api/adminResetPasswordKasirByID";
import { User } from "../types/model/table/User";
import bcrypt from 'bcrypt';

export const adminResetPasswordKasirByID: T_adminResetPasswordKasirByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const kasir = await User.findOneBy({
    id: req.path.id,
    is_active: true,
    deleted_at: IsNull(),
  });
  if (!kasir) {
    throw new Error(`data not found`);
  }

  kasir.password = await bcrypt.hash(req.body.new_password, 10);
  await kasir.save();
  return true;
}
