import { UserRole } from "@/api-client/model/enum/UserRole";
import { UserSession } from "@/user-session";

interface HeaderDesktopMenuProps {
  onLogout(): void
}

export function HeaderDesktopMenu(props: HeaderDesktopMenuProps) {
  const user = UserSession.getUser();

  return (
    <div className="flex flex-col items-center gap-2 py-5 px-6">
      <div className="text-center text-xl font-semibold">
        { user.nama || 'Andi' }
      </div>
      { user.role === UserRole.Kasir && <>
        <a
          href="/kasir"
          className="text-sky-500">
          Dashboard
        </a>
      </> }
      { user.role === UserRole.Admin && <>
        <a
          href="/admin"
          className="text-sky-500">
          Dashboard
        </a>
        <a
          href="/admin/transaksi"
          className="text-sky-500">
          Transaksi
        </a>
        <a
          href="/admin/pengeluaran"
          className="text-sky-500">
          Pengeluaran
        </a>
        <a
          href="/admin/layanan"
          className="text-sky-500">
          Layanan
        </a>
        <a
          href="/admin/pelanggan"
          className="text-sky-500">
          Pelanggan
        </a>
        <a
          href="/admin/kasir"
          className="text-sky-500">
          Kasir
        </a>
        <a
          href="/admin/setting"
          className="text-sky-500">
          Setting
        </a>
      </> }
      <a
        onClick={props.onLogout}
        className="text-red-400 cursor-pointer">
        Logout
      </a>
    </div>
  );
}
