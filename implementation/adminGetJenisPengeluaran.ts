import { ILike, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetJenisPengeluaran } from "../types/api/adminGetJenisPengeluaran";
import { JenisPengeluaran } from "../types/model/table/JenisPengeluaran";

export const adminGetJenisPengeluaran: T_adminGetJenisPengeluaran = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await JenisPengeluaran.findAndCount({
    where: req.query.keyword ? {
      label: ILike(`%${req.query.keyword}%`),
      deleted_at: IsNull()
    } : { deleted_at: IsNull() },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0
  });
  
  return { data, total };
}
