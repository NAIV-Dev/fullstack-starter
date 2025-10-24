import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDeleteLayananByID } from "../types/api/adminDeleteLayananByID";
import { Layanan } from "../types/model/table/Layanan";

export const adminDeleteLayananByID: T_adminDeleteLayananByID = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const layanan = await Layanan.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!layanan) {
    return false;
  }

  layanan.deleted_at = new Date();
  await layanan.save();

  return true;
}
