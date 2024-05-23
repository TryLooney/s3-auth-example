import { AvatarForm } from "@/components/avatar-form";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {session ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Avatar className="size-16 border">
              <AvatarImage
                src={session.user?.image ?? ""}
                alt={`${session.user?.name ?? "user"}'s pfp`}
              />
              <AvatarFallback>
                {session.user?.name?.slice(0, 2).toUpperCase() ?? "??"}
              </AvatarFallback>
            </Avatar>
            <AvatarForm />
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </main>
    </>
  );
}
