import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import TransactionTable from "./components/TransactionTable/TransactionTable";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionTable />} />
      </Routes>
    </Router>
  );
};

export default App;
