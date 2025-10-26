import { ILike, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetLayanan } from "../types/api/adminGetLayanan";
import { Layanan } from "../types/model/table/Layanan";

export const adminGetLayanan: T_adminGetLayanan = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await Layanan.findAndCount({
    where: req.query.keyword ? {
      nama: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0,
    order: {
      id: 'desc'
    }
  });
  
  return { data, total };
}
