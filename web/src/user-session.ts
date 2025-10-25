import { User } from "./api-client/model/table/User";

export namespace UserSession {
  export function setUser(token: string, user: User) {
    localStorage.setItem('zs-token', token);
    localStorage.setItem('zs-user', JSON.stringify(user));
  }

  export function getUser(): User {
    const user = localStorage.getItem('zs-user');
    if (!user) {
      return {
        id: '' as any,
        nama: '' as any,
        username: '' as any,
        password: '' as any,
        role:'' as any,
        is_active: false,
        created_at: '' as any,
      };
    }

    return JSON.parse(user);
  }

  export function getToken(): string {
    const token = localStorage.getItem('zs-token');
    if (!token) {
      return '';
    }

    return `Bearer ${token}`;
  }

  export function hasLoggedIn(): boolean {
    return Boolean(localStorage.getItem('zs-token'));
  }

  export function removeUser() {
    localStorage.removeItem('zs-token');
    localStorage.removeItem('zs-user');
  }
}
