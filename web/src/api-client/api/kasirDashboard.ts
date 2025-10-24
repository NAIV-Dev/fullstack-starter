

export interface T_kasirDashboard_headers {
  authorization: string
}
interface ReturnType_0 {
  transaksi_hari_ini: number
  total_pendapatan_hari_ini: number
}

export type T_kasirDashboard = (request: {
  headers: T_kasirDashboard_headers
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/kasir/dashboard';
export const alias = 'kasirDashboard';
