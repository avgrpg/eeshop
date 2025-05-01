import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { TopNavLink } from "./top-nav-link";

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-border px-6 backdrop-blur-md">
      <Link className="flex items-center gap-3" href="/">
        {/* <img src="/favicon.ico" alt="EE Shop Logo" className="h-8 w-8" /> */}
        <span className="truncate rounded-md bg-background/50 p-2 text-xl font-bold leading-none">
          eeshophk
        </span>
      </Link>

      <TopNavLink />
      {/* <div className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold leading-none tracking-tight">
        <Link
          href="/#products"
          className="rounded-md bg-background/50 p-2"
          prefetch={false}
        >
          產品
        </Link>
        <Link
          href="/#about"
          className="rounded-md bg-background/50 p-2"
          prefetch={false}
        >
          關於我們
        </Link>
        <ModeToggle />
      </div> */}

      {/* <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">EE Shop</span>
        </div>
      </div> */}
    </nav>
  );
}
