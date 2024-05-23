import { cn } from "@/lib/utils";

export function BounceLoader({
  className,
  classNames,
}: {
  className?: string;
  classNames?: {
    first?: string;
    second?: string;
    third?: string;
    all?: string;
  };
}) {
  return (
    <div
      className={cn(
        "*:bg-foreground flex items-center justify-center space-x-1 *:size-2 *:rounded-full",
        className,
      )}
    >
      <div
        className={cn(
          "animate-bounce [animation-delay:-0.3s]",
          classNames?.first,
          classNames?.all,
        )}
      />
      <div
        className={cn(
          "animate-bounce [animation-delay:-0.13s]",
          classNames?.all,
          classNames?.second,
        )}
      />
      <div
        className={cn(
          "h-5 w-5 animate-bounce rounded-full",
          classNames?.all,
          classNames?.third,
        )}
      />
    </div>
  );
}
