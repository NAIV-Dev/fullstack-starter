import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdateKasirByID } from "../types/api/adminUpdateKasirByID";
import { User } from "../types/model/table/User";
import bcrypt from 'bcrypt';

export const adminUpdateKasirByID: T_adminUpdateKasirByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const kasir = await User.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!kasir) {
    throw new Error(`data not found`);
  }
  kasir.nama = req.body.nama ?? kasir.nama;
  kasir.is_active = req.body.is_active ?? kasir.is_active;
  kasir.username = req.body.username ?? kasir.username;
  kasir.password = req.body.password ? await bcrypt.hash(req.body.password, 10) : kasir.password;
  return kasir.save();
}
