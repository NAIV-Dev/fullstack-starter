import { ILike, IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirGetLayanan } from "../types/api/kasirGetLayanan";
import { Layanan } from "../types/model/table/Layanan";

export const kasirGetLayanan: T_kasirGetLayanan = async req => {
  const user = await getKasirFromAuthHeader(req.headers.authorization);
  const [data, total] = await Layanan.findAndCount({
    where: req.query.keyword ? {
      nama: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0,
    order: {
      nama: 'asc'
    }
  });
  
  return { data, total };
}
