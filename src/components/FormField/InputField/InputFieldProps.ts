export interface InputFieldProps {
  type: "text" | "number";
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}