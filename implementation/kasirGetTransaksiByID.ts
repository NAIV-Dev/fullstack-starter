import { IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirGetTransaksiByID } from "../types/api/kasirGetTransaksiByID";
import { Transaksi } from "../types/model/table/Transaksi";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";

export const kasirGetTransaksiByID: T_kasirGetTransaksiByID = async req => {
  const kasir = await getKasirFromAuthHeader(req.headers.authorization);
  const trx = await Transaksi.findOne({
    where: {
      id: req.path.id,
      deleted_at: IsNull(),
      pengguna_id: kasir.id
    },
    relations: ['otm_pelanggan_id']
  });
  if (!trx) {
    throw new Error(`data not found`);
  }
  const list_item = await TransaksiDetail.findBy({ transaksi_id: trx.id });
  return {
    transaksi: trx,
    pelanggan: trx.otm_pelanggan_id!,
    list_item
  };
}
