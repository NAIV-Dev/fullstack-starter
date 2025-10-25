import { Between, ILike, In, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetTransaksi } from "../types/api/adminGetTransaksi";
import { Transaksi } from "../types/model/table/Transaksi";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";
import moment from "moment";

export const adminGetTransaksi: T_adminGetTransaksi = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await Transaksi.findAndCount({
    where: {
      nomor_transaksi: req.query.keyword ? ILike(`%${req.query.keyword}%`) : undefined as any,
      pelanggan_id: req.query.filter_pelanggan_id ?? undefined as any,
      metode_pembayaran: req.query.filter_metode_pembayaran ?? undefined as any,
      sudah_diambil: req.query.filter_sudah_diambil ? ((req.query.filter_sudah_diambil as unknown as string) === 'true') : undefined as any,
      sudah_lunas: req.query.filter_sudah_lunas ? ((req.query.filter_sudah_lunas as unknown as string) === 'true') : undefined as any,
      tanggal_transaksi: (req.query.filter_tanggal_from && req.query.filter_tanggal_to)
        ? Between(moment(req.query.filter_tanggal_from).toDate(), moment(req.query.filter_tanggal_to).toDate())
        : undefined as any,
      deleted_at: IsNull()
    },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0,
    relations: ['otm_pelanggan_id'],
    order: {
      id: 'desc'
    }
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
