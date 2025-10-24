import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdateLayananByID } from "../types/api/adminUpdateLayananByID";
import { Layanan } from "../types/model/table/Layanan";

export const adminUpdateLayananByID: T_adminUpdateLayananByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const layanan = await Layanan.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!layanan) {
    throw new Error(`data not found`);
  }
  layanan.nama = req.body.nama ?? layanan.nama;
  layanan.is_active = req.body.is_active ?? layanan.is_active;
  layanan.deskripsi = req.body.deskripsi ?? layanan.deskripsi ?? '';
  layanan.label_satuan = req.body.label_satuan ?? layanan.label_satuan ?? '';
  layanan.harga_satuan = req.body.harga_satuan ?? layanan.harga_satuan;
  return layanan.save();
}
