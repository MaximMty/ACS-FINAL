import { cn } from "@/lib/utils";

type MenuItemRowProps = {
  name: string;
  price: string;
  className?: string;
};

export function MenuItemRow({ name, price, className }: MenuItemRowProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-white/20 py-4 first:pt-0",
        className,
      )}
    >
      <span className="text-sm uppercase tracking-wide text-white">{name}</span>
      <span className="shrink-0 text-sm text-white">{price}</span>
    </div>
  );
}
