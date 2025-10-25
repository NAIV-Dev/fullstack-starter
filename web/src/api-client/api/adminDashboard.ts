
import { AdminDashboardData } from '../schema/AdminDashboardData'

export interface T_adminDashboard_headers {
  authorization: string
}

export type T_adminDashboard = (request: {
  headers: T_adminDashboard_headers
}, base_url?: string) => Promise<AdminDashboardData>;

export const method = 'get';
export const url_path = '/admin/dashboard';
export const alias = 'adminDashboard';
