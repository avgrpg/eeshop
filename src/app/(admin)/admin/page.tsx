"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";

export default function AdminPage() {
  return (
    <div className="flex flex-col border p-2 gap-2">
      Admin Page
      <Link href="/">back</Link>
      <UserButton />
      <div className="flex flex-col gap-2 border p-2 border-red-300">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log(res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
}
