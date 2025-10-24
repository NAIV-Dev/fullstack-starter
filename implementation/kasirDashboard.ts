import { Between, IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirDashboard } from "../types/api/kasirDashboard";
import { Transaksi } from "../types/model/table/Transaksi";
import moment from "moment";

export const kasirDashboard: T_kasirDashboard = async req => {
  const kasir = await getKasirFromAuthHeader(req.headers.authorization);
  return {
    transaksi_hari_ini: await Transaksi.countBy({
      deleted_at: IsNull(),
      pengguna_id: kasir.id,
      created_at: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate())
    }),
    total_pendapatan_hari_ini: (await Transaksi.sum('total_harga', {
      deleted_at: IsNull(),
      pengguna_id: kasir.id,
      created_at: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate())
    })) || 0,
  };
}
