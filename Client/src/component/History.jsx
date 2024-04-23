import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) => !filterType || transaction.type === filterType
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h3>History Component</h3>
      <div>
        <label>
          Filter by Type:
          <select value={filterType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
      <div>
        {sortedTransactions.map((transaction) => (
          <div key={transaction.id}>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <button onClick={() => handleDeleteTransaction(transaction.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
