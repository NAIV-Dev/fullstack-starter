import { Transaksi } from '../../model/table/Transaksi'
import { Layanan } from '../../model/table/Layanan'

export interface TransaksiDetail {
  id: number;
  transaksi_id: number;
  otm_transaksi_id?: Transaksi;
  layanan_id: number;
  otm_layanan_id?: Layanan;
  jumlah?: number;
  harga_satuan: number;
  subtotal: number;
}