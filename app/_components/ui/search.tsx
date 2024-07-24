"use client";

import { Input } from "@/app/_components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

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

  // Clear input when query is empty. This happens after an observation is added.
  useEffect(() => {
    if (!query && ref.current?.value) {
      ref.current.value = "";
    }
  }, [query]);

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

  return (
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
  );
}
