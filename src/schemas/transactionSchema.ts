import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  date: z.string().or(z.date()),
  category: z.enum(["personal", "business"]),
  senderName: z.string().refine(
    (name) => {
      const nameParts = name.trim().split(" ");
      return (
        nameParts.length >= 2 && nameParts.every((part) => part.length >= 2)
      );
    },
    {
      message:
        "Sender name must include at least first and last name.",
    }
  ),
  senderAccountNo: z
    .string()
    .refine((value: string) => /^\d{9,10}$/.test(value), {
      message:
        "Sender account number must contain only numbers and be between 9 and 10 characters long",
    }),
  recipientName: z.string().refine(
    (name) => {
      const nameParts = name.trim().split(" ");
      return (
        nameParts.length >= 2 && nameParts.every((part) => part.length >= 2)
      );
    },
    {
      message:
        "Recipient name must include at least first and last name.",
    }
  ),
  recipientAccountNo: z.string().refine((value: string) => /^\d{9,10}$/.test(value), {
      message:
        "Recipient account number must contain only numbers and be between 9 and 10 characters long",
    }),
  amount: z.number().positive("Amount must be greater than zero"),
});

export type TTransactionSchema = z.infer<typeof transactionSchema>;
