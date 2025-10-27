import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderDesktopMenu } from "./HeaderDesktopMenu";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { UserSession } from "@/user-session";
import { AxiosClient } from "@/api-client/AxiosClient";
import { useSystemConfig } from "@/hooks/useSystemConfig";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function Header(props: HeaderProps) {
  const [open_header_mobile, setOpenHeaderMobile] = useState<boolean>(false);
  const [open_header_desktop, setOpenHeaderDesktop] = useState<boolean>(false);
  const menu_desktop_ref = useRef<HTMLDivElement>(null);
  const user = UserSession.getUser();
  const { system_name } = useSystemConfig();

  useOutsideClick(menu_desktop_ref, () => {
    setOpenHeaderDesktop(false);
  });

  function logout() {
    UserSession.removeUser();
    window.location.href = '/';
  }

  return (
    <div
      {...props}
      className={`flex items-center justify-between p-3 px-4 transition transition-all bg-[#FAFAFA] ${props.className || ''}`}>
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-3">
          <div className="text-2xl font-semibold">
            { system_name }
          </div>
        </a>
      </div>
      <div className="relative flex items-center gap-2">
        <div
          className={`
            hidden
            lg:block
          `}>
          <div 
            ref={menu_desktop_ref}
            onClick={() => setOpenHeaderDesktop(!open_header_desktop)}
            className={`
              hidden
              md:flex md:items-center md:gap-3 md:rounded-full md:bg-[#0001] md:hover:bg-[#0002] md:p-[5px] md:cursor-pointer
            `}>
            <div className="px-3 font-medium">
              { user.nama || 'Andi' }
            </div>
          </div>
        </div>
        <div 
          onClick={() => setOpenHeaderMobile(true)}
          className={`lg:hidden w-8 h-8 cursor-pointer`}>
          <BurgerIcon />
        </div>
        { open_header_desktop && <div 
          onMouseUp={e => e.stopPropagation()}
          className="hidden lg:block absolute top-full right-0 w-60 bg-white rounded-2xl mt-2 shadow-[0px_1px_20px_1px_rgba(0,0,0,.07)]">
          <HeaderDesktopMenu
            onLogout={logout} />
        </div> }
      </div>
      <div 
        onClick={() => setOpenHeaderMobile(false)}
        className={`
          fixed left-0 top-0 w-screen overflow-hidden h-screen flex justify-end bg-[#0002] ${open_header_mobile ? 'z-[999]' : 'pointer-events-none opacity-0 z-[-1]'}
          lg:hidden
        `}>
        <div 
          onClick={e => e.stopPropagation()}
          className={`z-[999] w-[80%] h-full bg-zinc-100 transition transition-transform overflow-y-auto ${open_header_mobile ? 'translate-x-0' : 'translate-x-[100%]'}`}>
          <HeaderMobileMenu
            onLogout={logout} />
        </div>
      </div>
    </div>
  );
}

const BurgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" fill="#444"></path> </g></svg>
);
