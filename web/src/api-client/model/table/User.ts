import { UserRole } from '../../model/enum/UserRole'

export interface User {
  id: number;
  username: string;
  password: string;
  nama: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  deleted_at?: Date;
}