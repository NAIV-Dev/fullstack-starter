
export interface Pelanggan {
  id: number;
  nama: string;
  nomor_hp?: string;
  alamat?: string;
  created_at: Date;
  deleted_at?: Date;
}