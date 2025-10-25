import { HTMLAttributes } from "react";
import { Header } from "./Header";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

export function Layout(props: LayoutProps) {
  return (
    <div
      {...props}
      className={`flex flex-col min-h-[100dvh]`}>
      <div className="sticky top-0 z-[12]">
        <Header />
      </div>
      <div className={`
        px-4 py-5
        lg:px-[15%] lg:py-10
        ${props.className || ''}
      `}>
        { props.children }
      </div>
    </div>
  );
}
