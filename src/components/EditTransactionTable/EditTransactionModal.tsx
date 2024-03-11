import { FC, useState } from "react";
import Modal from "react-modal";
import { TTransactionSchema } from "../../schemas/transactionSchema";
import Button from "../Button";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: TTransactionSchema | null;
  onSave: (editedTransaction: TTransactionSchema) => void;
}

const EditTransactionModal: FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transactionData,
  onSave,
}) => {
  const [editedTransaction, setEditedTransaction] =
    useState<TTransactionSchema | null>(transactionData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TTransactionSchema
  ) => {
    if (!editedTransaction) return;
    setEditedTransaction({
      ...editedTransaction,
      [field]: e.target.value,
    });
  };


  const handleSave = () => {
    if (!editedTransaction) return;
    onSave(editedTransaction);
    console.log("Edited transaction:", editedTransaction);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
    >
      <h2 className="text-3xl font-bold text-tableTopText text-center mb-4">
        Edit Transaction
      </h2>
      {editedTransaction && (
        <form className="space-y-4 flex flex-col items-center justify-center">
          <div>
            <label className="text-white">Date:</label>
            <input
              className="border rounded border-[rgb(15, 47, 7)] block px-3 py-1"
              type="text"
              value={editedTransaction.date.toString()}
              onChange={(e) => handleChange(e, "date")}
            />
          </div>
          <div>
            <label>Sender Name:</label>
            <input
              className="border rounded border-[rgb(15, 47, 7)] block px-3 py-1"
              type="text"
              name="senderName"
              value={editedTransaction.senderName}
              onChange={(e) => handleChange(e, "senderName")}
            />
          </div>
          <div>
            <label>Sender Account Number:</label>
            <input
              className="border rounded border-[rgb(15, 47, 7)] block px-3 py-1"
              type="text"
              name="senderAccountNo"
              value={editedTransaction.senderAccountNo}
              onChange={(e) => handleChange(e, "senderAccountNo")}
            />
          </div>
          <div>
            <label>Recipient Name:</label>
            <input
              className="border rounded border-[rgb(15, 47, 7)] block px-3 py-1"
              type="text"
              name="recipientName"
              value={editedTransaction.recipientName}
              onChange={(e) => handleChange(e, "recipientName")}
            />
          </div>
          <label>Recipient Account Number:</label>
          <input
            className="border rounded border-[rgb(15, 47, 7)] block px-3 py-1"
            type="text"
            name="recipientAccountNo"
            value={editedTransaction.recipientAccountNo}
            onChange={(e) => handleChange(e, "recipientAccountNo")}
          />
          <div>
            <label>Amount (₦):</label>
            <input
              className="border rounded border-[rgb(15, 47, 7)] block px-3 py-1"
              type="number"
              name="amount"
              value={editedTransaction.amount.toString()}
              onChange={(e) => handleChange(e, "amount")}
            />
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <Button
              type="button"
              onClick={handleSave}
              className=" bg-container"
            >
              Save
            </Button>
            <Button type="button" onClick={onClose} className=" bg-cancel">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditTransactionModal;
