const FormMessage = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-medium text-destructive">{message}</p>;
};

export default FormMessage;
