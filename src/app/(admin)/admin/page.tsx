"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-2 border p-2">
      Admin Page
      <Link href="/">back</Link>
      <UserButton />
      <div className="flex flex-col gap-2 border border-red-300 p-2">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log(res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          headers={{
            productId: "8",
          }}
        />
      </div>
    </div>
  );
}
