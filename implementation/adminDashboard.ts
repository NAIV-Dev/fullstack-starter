import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDashboard } from "../types/api/adminDashboard";
import { UserRole } from "../types/model/enum/UserRole";
import { Layanan } from "../types/model/table/Layanan";
import { Pengeluaran } from "../types/model/table/Pengeluaran";
import { Transaksi } from "../types/model/table/Transaksi";
import { User } from "../types/model/table/User";

export const adminDashboard: T_adminDashboard = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  return {
    total_kasir: await User.countBy({ role: UserRole.Kasir, deleted_at: IsNull() }),
    total_layanan: await Layanan.countBy({ is_active: true, deleted_at: IsNull() }),
    total_transaksi: await Transaksi.countBy({ deleted_at: IsNull() }),
    total_pendapatan: (await Transaksi.sum('total_harga', { sudah_lunas: true, deleted_at: IsNull() }) || 0),
    total_pengeluaran: (await Pengeluaran.sum('jumlah', { deleted_at: IsNull() }) || 0),
  };
}
