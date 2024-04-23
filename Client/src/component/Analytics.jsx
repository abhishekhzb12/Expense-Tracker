import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const Analytics = () => {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions`
        );
        const data = response.data;
        console.log("Received data:", data);

        // Extract income data from the received data
        const incomeTransactions = data.filter(
          (transaction) => transaction.type === "Income"
        );

        // Calculate total income amount
        const totalIncome = incomeTransactions.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        console.log(totalIncome);

        // Create data object for Pie chart
        const incomeChartData = {
          labels: ["Income", "Expense"],
          datasets: [
            {
              label: "Income vs Expense",
              data: [totalIncome, 0], // Assuming total expense is 0
              backgroundColor: ["green", "red"],
            },
          ],
        };
        console.log("40", incomeChartData.datasets.data);

        setIncomeData(incomeChartData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []); // Empty dependency array to run only once after initial render
  console.log(incomeData);
  return (
    <div>
      <h3>Analytics Component</h3>
      <div>
        <h4>Income & Expense Chart</h4>
        <Pie data={incomeData ? incomeData : null} />
      </div>
    </div>
  );
};

export default Analytics;
