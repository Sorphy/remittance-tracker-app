import clsx from "clsx";
import { DateFieldProps } from "./DateFieldProps";
import { useFormContext } from "react-hook-form";
import { formattedDate } from "../../../utils/dateFormat";

const DateField = (props: DateFieldProps) => {
  const { label, name, className } = props;
  const {
    register,
    formState: { defaultValues },
  } = useFormContext();

  const defaultValue = defaultValues?.[name] || "";
  return (
    <div className={clsx(className)}>
      {label && (
        <label htmlFor={name} className="block mb-1  text-md">
          {label}
        </label>
      )}
      <input
        id="date"
        type="date"
        className="border text-sm rounded block w-full px-3 py-2 "
        {...register(name)}
        defaultValue={formattedDate(defaultValue)}
      />
    </div>
  );
};

export default DateField;
