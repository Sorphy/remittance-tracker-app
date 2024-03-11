import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import TransactionTable from "./components/TransactionTable/TransactionTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/" element={<TransactionTable />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
