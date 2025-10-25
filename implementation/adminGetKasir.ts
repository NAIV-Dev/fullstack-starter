import { ILike, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetKasir } from "../types/api/adminGetKasir";
import { User } from "../types/model/table/User";
import { UserRole } from "../types/model/enum/UserRole";

export const adminGetKasir: T_adminGetKasir = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await User.findAndCount({
    where: req.query.keyword ? {
      nama: ILike(`%${req.query.keyword}%`),
      role: UserRole.Kasir,
      deleted_at: IsNull()
    } : {
      role: UserRole.Kasir,
      deleted_at: IsNull(),
    },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0
  });
  
  return { data, total };
}
