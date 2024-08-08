import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

function PaginationFallback() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled href="/" />
        </PaginationItem>
        <div
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "icon",
            }),
            "text-muted-foreground",
          )}
        >
          ...
        </div>
        <PaginationItem>
          <PaginationNext disabled href="/" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationFallback;
