import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      Admin Page
      <Link href="/">back</Link>
      <UserButton />
    </div>
  );
}
