"use client";

import { updateAvatar } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { BounceLoader } from "./ui/bounce-loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AvatarForm() {
  const [state, formAction] = useActionState(updateAvatar, { message: "" });

  useEffect(() => {
    if (state.message) {
      toast(state.message);
      return;
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center justify-center gap-y-4 rounded border p-4"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="avatar">Avatar</Label>
        <Input
          type="file"
          accept="image/*"
          name="avatar"
          id="avatar"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit">
      {pending ? (
        <BounceLoader className="*:bg-primary-foreground" />
      ) : (
        "Submit"
      )}
    </Button>
  );
}
