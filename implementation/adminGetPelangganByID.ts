import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetPelangganByID } from "../types/api/adminGetPelangganByID";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const adminGetPelangganByID: T_adminGetPelangganByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const pelanggan = await Pelanggan.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!pelanggan) {
    throw new Error(`data not found`);
  }
  return pelanggan;
}
