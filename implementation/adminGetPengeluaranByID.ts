import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetPengeluaranByID } from "../types/api/adminGetPengeluaranByID";
import { Pengeluaran } from "../types/model/table/Pengeluaran";

export const adminGetPengeluaranByID: T_adminGetPengeluaranByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const pengeluaran = await Pengeluaran.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!pengeluaran) {
    throw new Error(`data not found`);
  }
  return pengeluaran;
}
