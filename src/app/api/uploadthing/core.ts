import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { z } from "zod";
import { db } from "~/server/db";
import { categories, productImages } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user?.userId) throw new UploadThingError("Unauthorized") as Error;

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, productId: req.headers.get("productId") };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata);

      console.log("file url", file);

      if (!metadata.productId)
        throw new UploadThingError("Product ID is required") as Error;

      const productId = z.coerce.number().safeParse(metadata.productId);
      if (!productId.success)
        throw new UploadThingError("Product ID is required") as Error;

      await db.insert(productImages).values({
        productId: productId.data,
        url: file.url,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
  categoryImageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user?.userId) throw new UploadThingError("Unauthorized") as Error;

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, categoryId: req.headers.get("categoryId") };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata);

      console.log("file url", file);

      if (!metadata.categoryId)
        throw new UploadThingError("Category ID is required") as Error;

      const categoryId = z.coerce.number().safeParse(metadata.categoryId);
      if (!categoryId.success)
        throw new UploadThingError("Category ID is required") as Error;

      const affectedCategory = await db
        .query.categories.findFirst({
          where: eq(categories.id, categoryId.data),
        })
      if (affectedCategory?.imageUrl) {
        const utapi = new UTApi();
        const imageId = affectedCategory.imageUrl.split("/").pop();
        if (!imageId) throw new Error("Error deleting image");
        await utapi.deleteFiles([imageId]);
      }

      await db
        .update(categories)
        .set({
          imageUrl: file.url,
        })
        .where(eq(categories.id, categoryId.data));

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
