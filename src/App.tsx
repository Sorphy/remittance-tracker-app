import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import TransactionTable from "./components/TransactionTable/TransactionTable";
// import EditTransactionModal from "./components/EditTransactionTable/EditTransactionModal";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionTable />} />
        {/* <Route path="/edit" element={<EditTransactionModal isOpen onClose={} transactionData={}  />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
