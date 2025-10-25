import { IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirDeleteTransaksiByID } from "../types/api/kasirDeleteTransaksiByID";
import { Transaksi } from "../types/model/table/Transaksi";

export const kasirDeleteTransaksiByID: T_kasirDeleteTransaksiByID = async req => {
  const kasir = await getKasirFromAuthHeader(req.headers.authorization);
  const transaksi = await Transaksi.findOneBy({
    id: req.path.id,
    pengguna_id: kasir.id,
    deleted_at: IsNull()
  });
  if (!transaksi) {
    return false;
  }

  transaksi.deleted_at = new Date();
  await transaksi.save();

  return true;
}
