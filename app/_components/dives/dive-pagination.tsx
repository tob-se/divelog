"use client";

import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination,
} from "../ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DivePagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        ) : (
          <PaginationItem className="p-3 opacity-50">
            <ChevronLeft className="h-4 w-4" />
          </PaginationItem>
        )}

        {allPages.map((page, index) => {
          return (
            <PaginationItem key={page + index.toString()}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        {currentPage < totalPages ? (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        ) : (
          <PaginationItem className="p-3 opacity-50">
            <ChevronRight className="h-4 w-4" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
