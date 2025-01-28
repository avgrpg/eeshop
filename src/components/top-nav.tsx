import Link from "next/link";

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-border px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <img src="/favicon.ico" alt="EE Shop Logo" className="h-8 w-8" />
        <span className="truncate text-xl font-bold leading-none rounded-md bg-background/50 p-2">EE Shop</span>
      </div>

      <div className="flex items-center gap-3 text-sm font-semibold leading-none">
        <Link href="/#products" className="rounded-md bg-background/50 p-2" prefetch={false}>Products</Link>
        <Link href="/#about" className="rounded-md bg-background/50 p-2" prefetch={false}>About Us</Link>
      </div>

      {/* <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">EE Shop</span>
        </div>
      </div> */}
    </nav>
  );
}
