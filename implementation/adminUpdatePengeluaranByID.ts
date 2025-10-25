import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdatePengeluaranByID } from "../types/api/adminUpdatePengeluaranByID";
import { Pengeluaran } from "../types/model/table/Pengeluaran";
import moment from "moment";

export const adminUpdatePengeluaranByID: T_adminUpdatePengeluaranByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const pengeluaran = await Pengeluaran.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!pengeluaran) {
    throw new Error(`data not found`);
  }
  pengeluaran.deskripsi = req.body.deskripsi ?? pengeluaran.deskripsi;
  pengeluaran.jumlah = req.body.jumlah ?? pengeluaran.jumlah;
  pengeluaran.id_jenis_pengeluaran = req.body.id_jenis_pengeluaran ?? pengeluaran.id_jenis_pengeluaran!;
  pengeluaran.tanggal = req.body.tanggal ? moment(req.body.tanggal).toDate() : pengeluaran.tanggal;
  return pengeluaran.save();
}
