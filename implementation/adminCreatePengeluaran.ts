import moment from "moment";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminCreatePengeluaran } from "../types/api/adminCreatePengeluaran";
import { Pengeluaran } from "../types/model/table/Pengeluaran";

export const adminCreatePengeluaran: T_adminCreatePengeluaran = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const pengeluaran = new Pengeluaran();
  pengeluaran.nomor_pengeluaran = '';
  pengeluaran.id_jenis_pengeluaran = req.body.id_jenis_pengeluaran;
  pengeluaran.tanggal = moment(req.body.tanggal).toDate();
  pengeluaran.pengguna_id = admin.id;
  pengeluaran.deskripsi = req.body.deskripsi || '';
  pengeluaran.jumlah = req.body.jumlah;
  await pengeluaran.save();

  pengeluaran.nomor_pengeluaran = `PUR/${moment().format('YYYYMMDD')}/${pengeluaran.id}`;
  await pengeluaran.save();

  return pengeluaran;
}
