import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const TransactionForm = () => {
  const [formData, setFormData] = useState({ type: "", amount: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        <select name="type" onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TransactionForm;
