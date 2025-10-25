import { Between, ILike, In, IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirTranasksiHariIni } from "../types/api/kasirTranasksiHariIni";
import { Transaksi } from "../types/model/table/Transaksi";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";
import moment from "moment";
import { maskThree } from "../utility";

export const kasirTranasksiHariIni: T_kasirTranasksiHariIni = async req => {
  const kasir = await getKasirFromAuthHeader(req.headers.authorization);
  const [data, total] = await Transaksi.findAndCount({
    where: {
      deleted_at: IsNull(),
      pengguna_id: kasir.id,
      created_at: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate())
    },
    relations: ['otm_pelanggan_id']
  });

  data.forEach(d => d.otm_pelanggan_id!.nomor_hp = maskThree(d.otm_pelanggan_id!.nomor_hp ?? ''));
  
  const list_items = await TransaksiDetail.findBy({ transaksi_id: In(data.map(x => x.id)) });
  return data.map(trx => ({
    transaksi: trx,
    pelanggan: trx.otm_pelanggan_id!,
    list_item: list_items.filter(i => i.transaksi_id == trx.id)
  }));
}
