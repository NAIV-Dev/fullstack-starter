import { UserRole } from "@/api-client/model/enum/UserRole";
import { useSystemConfig } from "@/hooks/useSystemConfig";
import { UserSession } from "@/user-session";
import { IDRFormatter } from "@/utility";
import { useEffect, useState } from "react";

interface HeaderMobileMenuProps {
  onLogout(): void
}

export function HeaderMobileMenu(props: HeaderMobileMenuProps) {
  const user = UserSession.getUser();
  const { system_name } = useSystemConfig();
  
  return (
    <div className="flex flex-col items-end gap-4 py-5 px-7">
      <a href="/" className="flex items-center gap-3">
        <div className="text-2xl font-semibold">
          { system_name }
        </div>
      </a>
      <div className="pl-3 font-semibold">
        { user.nama }
      </div>
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
