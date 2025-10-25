import { Between, In, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDashboard } from "../types/api/adminDashboard";
import { UserRole } from "../types/model/enum/UserRole";
import { Layanan } from "../types/model/table/Layanan";
import { Pengeluaran } from "../types/model/table/Pengeluaran";
import { Transaksi } from "../types/model/table/Transaksi";
import { User } from "../types/model/table/User";
import { ItemDataKasirTotalHariIni } from "../types/schema/ItemDataKasirTotalHariIni";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";
import _ from "lodash";
import moment from "moment";

export const adminDashboard: T_adminDashboard = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);

  const list_transaksi_hari_ini = await Transaksi.findBy({
    deleted_at: IsNull(),
    created_at: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate())
  });
  const list_items_hari_ini = await TransaksiDetail.findBy({ transaksi_id: In(list_transaksi_hari_ini.map(x => x.id)) });
  const group_by_layanan_id: _.Dictionary<TransaksiDetail[]> = _.groupBy(list_items_hari_ini, x => x.layanan_id);
  const list_layanan = await Layanan.findBy({ id: In(Object.keys(group_by_layanan_id)) });
  const data_hari_ini: ItemDataKasirTotalHariIni[] = list_layanan.map(layanan => ({
    nama_layanan: layanan.nama,
    label_satuan: layanan.label_satuan || '',
    jumlah: (group_by_layanan_id[layanan.id] ?? []).reduce((acc: number, td: TransaksiDetail) => +acc + +(td.jumlah ?? 0), 0)
  }));

  const total_pendapatan = (await Transaksi.sum('total_harga', { sudah_lunas: true, deleted_at: IsNull() }) || 0);
  const total_pengeluaran = (await Pengeluaran.sum('jumlah', { deleted_at: IsNull() }) || 0);
  const total_keuntungan = total_pendapatan - total_pengeluaran;

  const total_belum_ambil = await Transaksi.countBy({ sudah_diambil: false, deleted_at: IsNull() });
  const total_belum_bayar = await Transaksi.countBy({ sudah_lunas: false, deleted_at: IsNull() });
  
  return {
    total_kasir: await User.countBy({ role: UserRole.Kasir, deleted_at: IsNull() }),
    total_layanan: await Layanan.countBy({ is_active: true, deleted_at: IsNull() }),
    total_transaksi: await Transaksi.countBy({ deleted_at: IsNull() }),
    total_pendapatan,
    total_keuntungan,
    total_pengeluaran,
    total_belum_ambil,
    total_belum_bayar,
    data_hari_ini
  };
}
