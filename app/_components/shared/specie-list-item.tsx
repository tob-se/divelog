import { cn } from "@/lib/utils";
import { Specie } from "@/types/specie";
import { Fish } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  specie: Specie;
}

const SpecieListItem = forwardRef<HTMLLIElement, Props>(
  ({ specie, className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "relative flex select-none items-center gap-2 rounded-sm p-1 outline-none",
          className,
        )}
        {...props}
      >
        {specie.square_url ? (
          <Image
            src={specie.square_url}
            width={45}
            height={45}
            alt="Picture of the author"
            className="rounded-sm"
          />
        ) : (
          <Fish height={45} width={45} color="dimgray" />
        )}
        <div className="flex flex-col gap-1">
          <span className="leading-none">{specie.common_name}</span>
          <span className="leading-none text-muted-foreground">
            {specie.name}
          </span>
        </div>
        {children}
      </li>
    );
  },
);

SpecieListItem.displayName = "SpecieListItem";

export default SpecieListItem;
