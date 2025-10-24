import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminDeleteTransaksiByID } from "../types/api/adminDeleteTransaksiByID";
import { Transaksi } from "../types/model/table/Transaksi";

export const adminDeleteTransaksiByID: T_adminDeleteTransaksiByID = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const transaksi = await Transaksi.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!transaksi) {
    return false;
  }

  transaksi.deleted_at = new Date();
  await transaksi.save();

  return true;
}
