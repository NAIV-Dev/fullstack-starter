import { getAdminFromAuthHeader } from "../jwt";
import { T_adminCreateJenisPengeluaran } from "../types/api/adminCreateJenisPengeluaran";
import { JenisPengeluaran } from "../types/model/table/JenisPengeluaran";

export const adminCreateJenisPengeluaran: T_adminCreateJenisPengeluaran = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const jenis_pengeluaran = new JenisPengeluaran();
  jenis_pengeluaran.label = req.body.label;
  jenis_pengeluaran.deskripsi = req.body.deskripsi || '';
  return await jenis_pengeluaran.save();
}
