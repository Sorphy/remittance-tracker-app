import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "./InputFieldProps.tsx";
import clsx from "clsx";

const InputField = (props: InputFieldProps) => {
  const { label, name, type, placeholder, className } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(className)}>
      {label ? (
        <label htmlFor={name} className="block mb-1  text-md">
          {label}
        </label>
      ) : null}
      <input
        {...register(name, {valueAsNumber: type === 'number'})}
        type={type}
        id={name}
        placeholder={placeholder}
        aria-describedby={name}
        //   className="border border-gray-300 rounded-md px-3 py-2 w-full"
        className={clsx("border text-sm rounded block w-full px-3 py-2", {
          "":
            !errors[name]?.message || !errors[name]?.root?.message,
          "border-red-700":
            !!errors[name]?.message || !!errors[name]?.root?.message,
        })}
      />
      {!!errors[name]?.message || !!errors[name]?.root ? (
        <p className="mt-1 text-xs text-red-700">
          {!!errors[name]
            ? errors[name]?.message
              ? errors[name]?.message?.toString()
              : errors[name]?.root?.message
              ? errors[name]?.root?.message?.toString()
              : "There was an error"
            : null}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
