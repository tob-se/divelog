import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 4 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 2 pages,
  // show the first 2, an ellipsis, and the last page.
  if (currentPage <= 2) {
    return [1, 2, "...", totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first page, an ellipsis, and the last 2 pages.
  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, "...", currentPage, "...", totalPages];
};
