import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetKasirByID } from "../types/api/adminGetKasirByID";
import { User } from "../types/model/table/User";

export const adminGetKasirByID: T_adminGetKasirByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const kasir = await User.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!kasir) {
    throw new Error(`data not found`);
  }
  return kasir;
}
