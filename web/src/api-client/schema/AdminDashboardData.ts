import { ItemDataKasirTotalHariIni } from '../schema/ItemDataKasirTotalHariIni'

export interface AdminDashboardData {
  total_kasir: number
  total_layanan: number
  total_transaksi: number
  total_pendapatan: number
  total_keuntungan: number
  total_pengeluaran: number
  total_belum_ambil: number
  total_belum_bayar: number
  data_hari_ini: ItemDataKasirTotalHariIni[]
}