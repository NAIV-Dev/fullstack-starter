import { IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminUpdatePelangganByID } from "../types/api/adminUpdatePelangganByID";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const adminUpdatePelangganByID: T_adminUpdatePelangganByID = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const layanan = await Pelanggan.findOneBy({
    id: req.path.id,
    deleted_at: IsNull()
  });
  if (!layanan) {
    throw new Error(`data not found`);
  }
  layanan.nama = req.body.nama ?? layanan.nama;
  layanan.alamat = req.body.alamat ?? layanan.alamat ?? '';
  layanan.nomor_hp = req.body.nomor_hp ?? layanan.nomor_hp ?? '';
  return layanan.save();
}
