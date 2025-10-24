
export interface Layanan {
  id: number;
  nama: string;
  label_satuan?: string;
  harga_satuan: number;
  deskripsi?: string;
  is_active: boolean;
  created_at: Date;
  deleted_at?: Date;
}