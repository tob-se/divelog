import { Button } from "@/app/_components/ui/button";
import { Trash2 } from "lucide-react";
import { useObservationContext } from "./observation-context";

function DeleteObservationButton({ specieId }: { specieId: number }) {
  const { deleteObservation } = useObservationContext();

  return (
    <Button
      onClick={() => deleteObservation(specieId)}
      variant="outline"
      className="h-8 w-8 p-1.5"
      data-testid="delete-observation-button"
    >
      <Trash2 />
    </Button>
  );
}

export default DeleteObservationButton;
