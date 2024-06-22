import { useEffect } from "react";
import { useToast } from "../_components/ui/use-toast";

export const useMessageToast = (title: string, state: { message?: string }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title,
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, title, toast]);
};
