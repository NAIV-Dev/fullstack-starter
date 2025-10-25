import { UserRole } from "@/api-client/model/enum/UserRole";
import { UserSession } from "@/user-session";
import { IDRFormatter } from "@/utility";
import { useEffect, useState } from "react";

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
      { user.role === UserRole.Admin && <>
        <a
          href="/admin/dashboard"
          className="text-sky-500">
          Dashboard
        </a>
        <a
          href="/admin/transaction"
          className="text-sky-500">
          Transaction
        </a>
        <a
          href="/admin/kasir"
          className="text-sky-500">
          Kasir
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
