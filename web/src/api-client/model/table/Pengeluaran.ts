import { User } from '../../model/table/User'
import { JenisPengeluaran } from '../../model/table/JenisPengeluaran'

export interface Pengeluaran {
  id: number;
  pengguna_id: number;
  otm_pengguna_id?: User;
  id_jenis_pengeluaran?: number;
  otm_id_jenis_pengeluaran?: JenisPengeluaran;
  nomor_pengeluaran: string;
  tanggal: Date;
  deskripsi: string;
  jumlah: number;
  created_at: Date;
  deleted_at?: Date;
}