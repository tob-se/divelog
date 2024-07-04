import { Dive } from "@/types/dive";
import DiveListItem from "./dive-list-item";

function DiveList({ dives }: { dives: Dive[] }) {
  return (
    <ul className="flex h-full flex-col gap-2 overflow-auto">
      {dives.map((dive) => (
        <DiveListItem key={dive.id} dive={dive} />
      ))}
    </ul>
  );
}

export default DiveList;
