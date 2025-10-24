import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetTransaksiByID } from "../types/api/adminGetTransaksiByID";
import { Transaksi } from "../types/model/table/Transaksi";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";

export const adminGetTransaksiByID: T_adminGetTransaksiByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const trx = await Transaksi.findOne({
    where: {
      id: req.path.id,
      deleted_at: IsNull()
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
