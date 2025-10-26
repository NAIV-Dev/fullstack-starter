import { Between, In, IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirGetTotalTransaksiHariIni } from "../types/api/kasirGetTotalTransaksiHariIni";
import { Transaksi } from "../types/model/table/Transaksi";
import moment from "moment";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";
import _ from "lodash";
import { Layanan } from "../types/model/table/Layanan";

export const kasirGetTotalTransaksiHariIni: T_kasirGetTotalTransaksiHariIni = async req => {
  const kasir = await getKasirFromAuthHeader(req.headers.authorization);
  const list_transaksi_hari_ini = await Transaksi.findBy({
    deleted_at: IsNull(),
    pengguna_id: kasir.id,
    tanggal_transaksi: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate())
  });
  const list_items_hari_ini = await TransaksiDetail.findBy({ transaksi_id: In(list_transaksi_hari_ini.map(x => x.id)) });
  const group_by_layanan_id: _.Dictionary<TransaksiDetail[]> = _.groupBy(list_items_hari_ini, x => x.layanan_id);
  const list_layanan = await Layanan.findBy({ id: In(Object.keys(group_by_layanan_id)) });
  return list_layanan.map(layanan => ({
    nama_layanan: layanan.nama,
    label_satuan: layanan.label_satuan || '',
    jumlah: (group_by_layanan_id[layanan.id] ?? []).reduce((acc: number, td: TransaksiDetail) => +acc + +(td.jumlah ?? 0), 0)
  }));
}
