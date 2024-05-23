import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";

export function Toolbar() {
  return (
    <div className="absolute bottom-12 flex w-full items-center justify-center">
      <div className="bg-background fixed flex items-center justify-center space-x-2 rounded-full border px-4 py-2">
        <Link
          href={"https://github.com/TryLooney/s3-auth-example"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-8 rounded-full",
          )}
        >
          <Github className="size-5" />
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
