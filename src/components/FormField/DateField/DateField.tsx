import clsx from "clsx";
import { DateFieldProps } from "./DateFieldProps";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";

const DateField = (props: DateFieldProps) => {
  const { label, name, className } = props;
  const {
    register,
    formState: { defaultValues },
  } = useFormContext();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };
  const defaultValue = defaultValues?.[name] || "";
  return (
    <div className={clsx(className)}>
      {label && (
        <label htmlFor={name} className="block mb-1  text-md">
          {label}
        </label>
      )}
      <input
        id={name}
        type="date"
        className="border text-sm rounded block w-full px-3 py-2 "
        {...register(name)}
        defaultValue={formatDate(defaultValue)}
      />
    </div>
  );
};

export default DateField;
