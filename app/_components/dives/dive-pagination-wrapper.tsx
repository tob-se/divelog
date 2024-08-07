import { countTotalDivePages } from "@/infrastructure/data-access/count-total-dive-pages";
import DivePagination from "./dive-pagination";

async function DivePaginationWrapper({ query }: { query: string }) {
  const totalPages = await countTotalDivePages(query);

  return <DivePagination totalPages={totalPages} />;
}

export default DivePaginationWrapper;
