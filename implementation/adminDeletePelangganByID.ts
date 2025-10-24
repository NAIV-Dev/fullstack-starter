import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDeletePelangganByID } from "../types/api/adminDeletePelangganByID";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const adminDeletePelangganByID: T_adminDeletePelangganByID = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const pelanggan = await Pelanggan.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!pelanggan) {
    return false;
  }

  pelanggan.deleted_at = new Date();
  await pelanggan.save();

  return true;
}
