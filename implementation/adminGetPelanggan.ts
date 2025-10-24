import { ILike, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetPelanggan } from "../types/api/adminGetPelanggan";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const adminGetPelanggan: T_adminGetPelanggan = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await Pelanggan.findAndCount({
    where: req.query.keyword ? {
      nama: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0
  });
  
  return { data, total };
}
