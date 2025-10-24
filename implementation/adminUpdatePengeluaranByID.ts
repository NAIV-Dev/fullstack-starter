import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdatePengeluaranByID } from "../types/api/adminUpdatePengeluaranByID";
import { Pengeluaran } from "../types/model/table/Pengeluaran";
import moment from "moment";

export const adminUpdatePengeluaranByID: T_adminUpdatePengeluaranByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const layanan = await Pengeluaran.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!layanan) {
    throw new Error(`data not found`);
  }
  layanan.deskripsi = req.body.deskripsi ?? layanan.deskripsi;
  layanan.jumlah = req.body.jumlah ?? layanan.jumlah;
  layanan.tanggal = req.body.tanggal ? moment(req.body.tanggal).toDate() : layanan.tanggal;
  return layanan.save();
}
