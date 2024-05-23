"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { minio } from "@/server/minio";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateAvatar(
  initialState: { message: string },
  formData: FormData,
) {
  const session = await auth();

  if (!session)
    return {
      message: "Unauthorized",
    };

  const schema = z.object({
    avatar: z.instanceof(File),
  });

  const parse = schema.safeParse({
    avatar: formData.get("avatar"),
  });

  if (!parse.success) {
    return { message: "Something went wrong!" };
  }

  const data = parse.data;

  if (data.avatar.size > 1 * 1024 * 1024)
    return {
      message: "File must be less than 1MB",
    };

  if (data.avatar.type !== "image/png" && data.avatar.type !== "image/jpeg")
    return {
      message: "File must be a PNG or JPEG",
    };

  const avatar = Buffer.from(await data.avatar.arrayBuffer());

  await minio.putObject("avatars", `avatar-${session.user.id}`, avatar);

  const response = await minio.getObject(
    "avatars",
    `avatar-${session.user.id}`,
  );

  const avatarUrl = await minio.presignedUrl(
    "GET",
    "avatars",
    `avatar-${session.user.id}`,
  );

  try {
    await db
      .update(users)
      .set({ image: avatarUrl })
      .where(eq(users.id, session.user.id));

    revalidatePath("/");
    return { message: `Successfully updated avatar` };
  } catch (e) {
    return { message: "Something went wrong" };
  }
}
