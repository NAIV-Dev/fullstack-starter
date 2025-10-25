import { UserRole } from "@/api-client/model/enum/UserRole";
import { UserSession } from "@/user-session";
import { IDRFormatter } from "@/utility";
import { useEffect, useState } from "react";

interface HeaderMobileMenuProps {
  onLogout(): void
}

export function HeaderMobileMenu(props: HeaderMobileMenuProps) {
  const user = UserSession.getUser();
  
  return (
    <div className="flex flex-col items-end gap-4 py-5 px-7">
      <a href="/" className="flex items-center gap-3">
        <div className="text-2xl font-semibold">
          Wening Laundry
        </div>
      </a>
      <div className="pl-3 font-semibold">
        { user.nama }
      </div>
      { user.role === UserRole.Admin && <>
        <a
          href="/dashboard"
          className="text-sky-500">
          Dashboard
        </a>
        <a
          href="/transaction"
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
