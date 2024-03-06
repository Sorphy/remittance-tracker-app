import {
  transactionSchema,
  TTransactionSchema,
} from "../schemas/transactionSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import Button from "./Button";
import InputField from "./FormField/InputField/InputField";
import DateField from "./FormField/DateField/DateField";
import { formattedDate } from "../utils/dateFormat";
import { v4 as uuidv4 } from 'uuid';

const TransactionForm: FC = () => {
    const [isFileCreated, setIsFileCreated] = useState(false);

  const methods = useForm<TTransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      category: "personal",
      senderName: "",
      senderAccountNo: "",
      recipientName: "",
      recipientAccountNo: "",
      amount: 0,
    },
  });

const onSubmit = (data: TTransactionSchema) => {
    try {
      // Read existing data from localStorage if it exists
      let existingData: TTransactionSchema[] = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );

        const currentDate = new Date();
        const formattedCurrentDate = formattedDate(currentDate.toISOString());
      const newData = {
        id: uuidv4() as string,
        ...data,
        createdAt: formattedCurrentDate,
        updatedAt: formattedCurrentDate,
      };

      // Append the new transaction data
      const updatedData = [...existingData, newData];
      // Write the updated data back to localStorage
      localStorage.setItem("transactions", JSON.stringify(updatedData));

      // Set the file creation status to true
        setIsFileCreated(true);
        console.log(updatedData);

      // Reset the form
      methods.reset();
    } catch (error) {
    console.error("Error:", error);
  }
};
    
  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <DateField label="Date" name="date" />
        <div>
          <label htmlFor="category" className="block mb-1 text-sky-950 text-md">
            Category:
          </label>
          <select
            id="category"
            className="pl-2 pr-8 border border-sky-950 text-sm rounded block w-full px-4 py-2 "
            {...methods.register("category")}
          >
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </select>
        </div>
        <InputField type="text" label="Sender Name" name="senderName" />
        <InputField
          type="text"
          label="Sender Account Number"
          name="senderAccountNo"
        />
        <InputField type="text" label="Recipient Name" name="recipientName" />
        <InputField
          type="text"
          label="Recipient Account Number"
          name="recipientAccountNo"
        />
        <InputField type="number" name="amount" label="Amount (₦)" />
      <Button
        type="submit"
        disabled={isFileCreated}
      >
        Add Transaction
      </Button>
      </form>
    </FormProvider>
  );
};

export default TransactionForm;
