import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetJenisPengeluaranByID } from "../types/api/adminGetJenisPengeluaranByID";
import { JenisPengeluaran } from "../types/model/table/JenisPengeluaran";

export const adminGetJenisPengeluaranByID: T_adminGetJenisPengeluaranByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const jenis_pengeluaran = await JenisPengeluaran.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!jenis_pengeluaran) {
    throw new Error(`data not found`);
  }
  return jenis_pengeluaran;
}
