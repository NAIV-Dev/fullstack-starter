

export interface T_adminDashboard_headers {
  authorization: string
}
interface ReturnType_0 {
  total_kasir: number
  total_layanan: number
  total_transaksi: number
  total_pendapatan: number
  total_pengeluaran: number
}

export type T_adminDashboard = (request: {
  headers: T_adminDashboard_headers
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/dashboard';
export const alias = 'adminDashboard';
