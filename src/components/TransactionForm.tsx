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
        ...data,
        createdAt: formattedCurrentDate,
        updatedAt: formattedCurrentDate,
      };
      const updatedData = [...existingData, newData];
      localStorage.setItem("transactions", JSON.stringify(updatedData));
        setIsFileCreated(true);
        console.log(updatedData);
      methods.reset();
    } catch (error) {
    console.error("Error:", error);
  }
};
    
  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <DateField label="Date" name="date" />
        <div>
          <label htmlFor="category" className="block mb-1 text-md">
            Category:
          </label>
          <select
            id="category"
            className="pl-2 pr-8 border  text-sm rounded block w-full px-4 py-2 "
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
      </form>
      <Button
        className="mt-6"
        disabled={isFileCreated}
        onClick={methods.handleSubmit(onSubmit)}
      >
        Add Transaction
      </Button>
    </FormProvider>
  );
};

export default TransactionForm;
