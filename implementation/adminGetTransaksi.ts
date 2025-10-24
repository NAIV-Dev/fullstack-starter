import { ILike, In, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetTransaksi } from "../types/api/adminGetTransaksi";
import { Transaksi } from "../types/model/table/Transaksi";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";

export const adminGetTransaksi: T_adminGetTransaksi = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await Transaksi.findAndCount({
    where: req.query.keyword ? {
      nomor_transaksi: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0,
    relations: ['otm_pelanggan_id']
  });
  
  const list_items = await TransaksiDetail.findBy({ transaksi_id: In(data.map(x => x.id)) });
  return {
    data: data.map(trx => ({
      transaksi: trx,
      pelanggan: trx.otm_pelanggan_id!,
      list_item: list_items.filter(i => i.transaksi_id == trx.id)
    })),
    total
  };
}
