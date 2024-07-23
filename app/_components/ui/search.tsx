"use client";

import { Input } from "@/app/_components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  query,
  placeholder,
  autoFocus,
}: {
  query: string;
  placeholder: string;
  autoFocus?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
      autoFocus={autoFocus}
      defaultValue={query}
      className="min-h-10 text-base"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      placeholder={placeholder}
      data-testid="search-input"
    />
  );
}
