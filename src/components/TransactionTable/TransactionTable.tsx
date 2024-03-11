import { FC, useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TTransactionSchema } from "../../schemas/transactionSchema";
import { EditIcon } from "../../assets/svg";
import EditTransactionModal from "../EditTransactionTable/EditTransactionModal";
import { Link } from "react-router-dom";

const TransactionTable: FC = () => {
  const [transactions, setTransactions] = useState<TTransactionSchema[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<
    TTransactionSchema[]
  >([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<TTransactionSchema | null>(null);

  useEffect(() => {
    // Fetch transactions from localStorage
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions);
      setDisplayedTransactions(parsedTransactions);
    }
  }, []);

  const handleCategoryChange = (category: string | null) => {
    setCategoryFilter(category);
    if (category) {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.category === category
      );
      setDisplayedTransactions(filteredTransactions);
    } else {
      setDisplayedTransactions(transactions);
    }
  };

  const handleEditClick = (transaction: TTransactionSchema) => {
    setTransactionToEdit(transaction);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (editedTransaction: TTransactionSchema) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editedTransaction.id ? editedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setDisplayedTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setIsEditModalOpen(false);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "56px",
        color: "#365314", // Text color for unstriped rows
        backgbackgroundColor: "#FFFFFF",
        "&:nth-child(2n)": {
          backgroundColor: "#365314",
          color: "#FFFFFF",
        },
      },
    },
  };

  const columns: TableColumn<TTransactionSchema>[] = [
    {
      name: "S/N",
      cell: (_row, index) => <span>{index + 1}</span>, // Serial number column
      width: "60px",
    },
    {
      name: "Date",
      selector: (row: TTransactionSchema) => row.date.toString(),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: TTransactionSchema) => row.category,
      sortable: true,
    },
    {
      name: "Sender Name",
      selector: (row: TTransactionSchema) => row.senderName,
      sortable: true,
    },
    {
      name: "Sender Account No",
      selector: (row: TTransactionSchema) => row.senderAccountNo,
      sortable: true,
    },
    {
      name: "Recipient Name",
      selector: (row: TTransactionSchema) => row.recipientName,
      sortable: true,
    },
    {
      name: "Recipient Account No",
      selector: (row: TTransactionSchema) => row.recipientAccountNo,
      sortable: true,
    },
    {
      name: "Amount (₦)",
      selector: (row: TTransactionSchema) => row.amount.toString(),
      sortable: true,
    },
    {
      name: "Edit", // Action column for editing
      cell: (row: TTransactionSchema) => (
        <button onClick={() => handleEditClick(row)}>
          <EditIcon />
        </button>
      ),
      width: "80px",
    },
  ];

  return (
    <div className="p-10">
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold text-tableTopText sm:text-xl">
              Transactions
            </h2>
          </div>
          <div className="flex items-center text-tableTopText sm:text-xs">
            <label htmlFor="categoryFilter" className="mr-2">
              Filter by:
            </label>
            <select
              id="categoryFilter"
              className="px-2 py-1 border border-tableTopText rounded"
              value={categoryFilter || ""}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
            >
              <option value="">All</option>
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>
        <Link to="/add-transaction">
          <h2 className="rounded border-tableTopText  text-tableTopText border  max-w-[200px] sm:max-w-[150px] sm:text-xs sm:p-1 text-center p-2">
            Add New Transaction
          </h2>
        </Link>
        <DataTable
          columns={columns}
          data={displayedTransactions}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          fixedHeader
          striped
          customStyles={customStyles}
        />
      </div>
      {isEditModalOpen && (
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transactionData={transactionToEdit}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default TransactionTable;
