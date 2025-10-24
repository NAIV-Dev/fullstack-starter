import { getAdminFromAuthHeader } from "../jwt";
import { T_adminCreateLayanan } from "../types/api/adminCreateLayanan";
import { Layanan } from "../types/model/table/Layanan";

export const adminCreateLayanan: T_adminCreateLayanan = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const layanan = new Layanan();
  layanan.nama = req.body.nama;
  layanan.label_satuan = req.body.label_satuan || '';
  layanan.harga_satuan = req.body.harga_satuan;
  layanan.deskripsi = req.body.deskripsi || '';
  layanan.is_active = req.body.is_active || false;
  return await layanan.save();
}
