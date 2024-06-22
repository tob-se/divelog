import FormMessage from "./form-message";

const FormErrors = ({ errors }: { errors?: string[] }) => {
  return errors?.map((error) => <FormMessage key={error} message={error} />);
};

export default FormErrors;
