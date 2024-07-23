const FormMessage = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return <p className="font-medium text-destructive">{message}</p>;
};

export default FormMessage;
