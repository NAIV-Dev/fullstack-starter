import { Between, ILike, In, IsNull } from "typeorm";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminGetPengeluaran } from "../types/api/adminGetPengeluaran";
import { Pengeluaran } from "../types/model/table/Pengeluaran";
import moment from "moment";

export const adminGetPengeluaran: T_adminGetPengeluaran = async req => {
  const user = await getAdminFromAuthHeader(req.headers.authorization);
  const [data, total] = await Pengeluaran.findAndCount({
    where: {
      deskripsi: req.query.keyword ? ILike(`%${req.query.keyword}%`) : undefined as any,
      id_jenis_pengeluaran: req.query.filter_jenis_pengeluaran_id_csv ? In(req.query.filter_jenis_pengeluaran_id_csv.split(',').map(Number)) : undefined as any,
      tanggal: (req.query.filter_tanggal_from && req.query.filter_tanggal_to)
        ? Between(moment(req.query.filter_tanggal_from).toDate(), moment(req.query.filter_tanggal_to).toDate())
        : undefined as any,
      deleted_at: IsNull()
    },
    take: req.query.limit ?? 10,
    skip: req.query.offset ?? 0,
    order: {
      tanggal: 'desc'
    }
  });
  
  return { data, total };
}
