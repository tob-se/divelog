import { Command as CommandPrimitive } from "cmdk";
import { ComponentProps } from "react";

function CommandWithLabel({
  children,
  ...props
}: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      {...props}
      className="space-y-2 [&_[cmdk-label]]:!relative [&_[cmdk-label]]:!w-fit [&_[cmdk-label]]:!h-fit [&_[cmdk-label]]:text-sm [&_[cmdk-label]]:font-medium [&_[cmdk-label]]:leading-none [&_[cmdk-label]]:peer-disabled:cursor-not-allowed"
    >
      {children}
    </CommandPrimitive>
  );
}

export default CommandWithLabel;
