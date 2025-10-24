import { User } from '../../model/table/User'

export interface Pengeluaran {
  id: number;
  nomor_pengeluaran: string;
  tanggal: Date;
  pengguna_id: number;
  otm_pengguna_id?: User;
  deskripsi: string;
  jumlah: number;
  created_at: Date;
  deleted_at?: Date;
}