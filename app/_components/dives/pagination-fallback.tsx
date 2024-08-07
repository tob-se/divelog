import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";

function PaginationFallback() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="p-3 opacity-50">
          <ChevronLeft className="h-4 w-4" />
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
        <PaginationItem className="p-3 opacity-50">
          <ChevronRight className="h-4 w-4" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationFallback;
