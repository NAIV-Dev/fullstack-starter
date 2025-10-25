import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDeleteJenisPengeluaranByID } from "../types/api/adminDeleteJenisPengeluaranByID";
import { JenisPengeluaran } from "../types/model/table/JenisPengeluaran";

export const adminDeleteJenisPengeluaranByID: T_adminDeleteJenisPengeluaranByID = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const jenis_pengeluaran = await JenisPengeluaran.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!jenis_pengeluaran) {
    return false;
  }

  jenis_pengeluaran.deleted_at = new Date();
  await jenis_pengeluaran.save();

  return true;
}
