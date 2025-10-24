import { getAdminFromAuthHeader } from "../jwt";
import { T_adminCreateKasir } from "../types/api/adminCreateKasir";
import { UserRole } from "../types/model/enum/UserRole";
import { User } from "../types/model/table/User";
import bcrypt from 'bcrypt';

export const adminCreateKasir: T_adminCreateKasir = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const kasir = new User();
  kasir.role = UserRole.Kasir;
  kasir.username = req.body.username;
  kasir.nama = req.body.nama;
  kasir.is_active = req.body.is_active || false;
  kasir.password = await bcrypt.hash(req.body.password, 10);
  return await kasir.save();
}
