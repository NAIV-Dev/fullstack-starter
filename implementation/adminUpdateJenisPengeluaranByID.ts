import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdateJenisPengeluaranByID } from "../types/api/adminUpdateJenisPengeluaranByID";
import { JenisPengeluaran } from "../types/model/table/JenisPengeluaran";

export const adminUpdateJenisPengeluaranByID: T_adminUpdateJenisPengeluaranByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const jenis_pengeluaran = await JenisPengeluaran.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!jenis_pengeluaran) {
    throw new Error(`data not found`);
  }
  jenis_pengeluaran.label = req.body.label ?? jenis_pengeluaran.label;
  jenis_pengeluaran.deskripsi = req.body.deskripsi ?? jenis_pengeluaran.deskripsi ?? '';
  return jenis_pengeluaran.save();
}
