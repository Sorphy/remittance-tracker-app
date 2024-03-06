import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ClassName {
  children: ReactNode;
}

const TransactionContainer: FC<ClassName> = ({ children }) => {
  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-container">
      <div className="relative p-4 lg:p-10 rounded-md bg-innerC  max-w-[700px] w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold text-tableTopText mb-4">
            Add New Transaction
          </h1>
          <Link to="/transactions">
            <Button className="px-6 py-3">View All Transactions</Button>
          </Link>
        </div>
        <div className=" w-full">{children}</div>
      </div>
    </div>
  );
};

export default TransactionContainer;
