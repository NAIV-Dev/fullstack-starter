import { getAdminFromAuthHeader } from "../jwt";
import { T_adminCreatePelanggan } from "../types/api/adminCreatePelanggan";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const adminCreatePelanggan: T_adminCreatePelanggan = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const pelanggan = new Pelanggan();
  pelanggan.nama = req.body.nama;
  pelanggan.nomor_hp = req.body.nomor_hp || '';
  pelanggan.alamat = req.body.alamat || '';
  return await pelanggan.save();
}
