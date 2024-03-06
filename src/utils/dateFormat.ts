import { format } from "date-fns";

export const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd");
};