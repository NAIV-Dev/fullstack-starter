import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDeleteKasirByID } from "../types/api/adminDeleteKasirByID";
import { User } from "../types/model/table/User";
import { UserRole } from "../types/model/enum/UserRole";

export const adminDeleteKasirByID: T_adminDeleteKasirByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const kasir = await User.findOneBy({
    id: req.path.id,
    deleted_at: IsNull(),
    role: UserRole.Kasir
  });
  
  if (!kasir) {
    return false;
  }

  kasir.deleted_at = new Date();
  await kasir.save();

  return true;
}
