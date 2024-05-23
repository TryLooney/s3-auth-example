import { auth } from "@/server/auth";
import { ProfileForm } from "./profile-form";

export async function Profile() {
  const session = await auth();

  if (!session) return null;

  return <ProfileForm />;
}
