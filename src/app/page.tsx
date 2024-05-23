import { Profile } from "@/components/profile";
import { SignIn } from "@/components/sign-in";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <main className="flex min-h-screen items-center justify-center">
        {session ? (
          <div>
            <img src={session.user.image ?? ""} className="size-16" />
          </div>
        ) : (
          <SignIn />
        )}
        <Profile />
      </main>
    </>
  );
}
