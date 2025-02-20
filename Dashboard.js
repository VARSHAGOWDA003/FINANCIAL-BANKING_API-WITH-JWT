import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/accounts/${accountId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);  // ✅ Set correct balance
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transactions?accountId=${accountId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);  // ✅ Set transactions correctly
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (token && accountId) {
      fetchAccountDetails();
      fetchTransactions();
    }
  }, [token, accountId]);

  return (
    <div>
      <h1>Welcome, User!</h1>
      <h2>Your Balance: ₹{balance}</h2>
      <h3>Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id}>{tx.amount} - {tx.type}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
