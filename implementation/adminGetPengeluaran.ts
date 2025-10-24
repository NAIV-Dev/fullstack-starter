import { ILike, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetPengeluaran } from "../types/api/adminGetPengeluaran";
import { Pengeluaran } from "../types/model/table/Pengeluaran";

export const adminGetPengeluaran: T_adminGetPengeluaran = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await Pengeluaran.findAndCount({
    where: req.query.keyword ? {
      deskripsi: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0
  });
  
  return { data, total };
}
