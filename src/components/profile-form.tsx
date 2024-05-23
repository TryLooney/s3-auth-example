"use client";

import { updateAvatar } from "@/app/actions";
import { useActionState } from "react";

export function ProfileForm() {
  const [state, formAction] = useActionState(updateAvatar, { message: "" });

  return (
    <form action={formAction}>
      <input type="file" name="avatar" id="avatar" required />
      <button type="submit">Submit</button>
      <p>{state.message}</p>
    </form>
  );
}
