import { ILike, IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirGetPelanggan } from "../types/api/kasirGetPelanggan";
import { Pelanggan } from "../types/model/table/Pelanggan";
import { maskThree } from "../utility";

export const kasirGetPelanggan: T_kasirGetPelanggan = async req => {
  const user = await getKasirFromAuthHeader(req.headers.authorization);
  const [data, total] = await Pelanggan.findAndCount({
    where: req.query.keyword ? {
      nama: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0
  });
  
  data.forEach(p => p.nomor_hp = maskThree(p.nomor_hp ?? ''));
  return {
    data,
    total
  };
}
