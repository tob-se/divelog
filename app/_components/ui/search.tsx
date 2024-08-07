"use client";

import { Input } from "@/app/_components/ui/input";
import { XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "./button";

export default function Search({
  query,
  placeholder,
}: {
  query: string;
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleClear = () => {
    if (ref.current) {
      if (ref.current.value) {
        ref.current.value = "";

        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.delete("query");
        replace(`${pathname}?${params.toString()}`);
      }

      ref.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        defaultValue={query}
        className="min-h-10"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
        data-testid="search-input"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        onClick={handleClear}
        data-testid="clear-search-button"
      >
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Clear search query</span>
      </Button>
    </div>
  );
}
