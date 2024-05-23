import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";

import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [GitHub],
  adapter: DrizzleAdapter(db, createTable) as Adapter,
});
