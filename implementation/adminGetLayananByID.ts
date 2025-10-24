import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetLayananByID } from "../types/api/adminGetLayananByID";
import { Layanan } from "../types/model/table/Layanan";

export const adminGetLayananByID: T_adminGetLayananByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const layanan = await Layanan.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!layanan) {
    throw new Error(`data not found`);
  }
  return layanan;
}
