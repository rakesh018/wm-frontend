import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import "./transactions.css";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { alertToast } from "../../../alertToast";

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

export const TransactionalAnalytics = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [labels, setLabels] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [depositData, setDepositData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          "https://server.trademax1.com/admin/analytics/annual-analytics",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        if(response.status===403){
          navigate('/adminLogin');
        }
        if (!response.ok) {
          alertToast("Failed to fetch analytics",'error');
        }

        let result = await response.json();
        result = result.analyticsData;
        // Process the array of analytics data
        const months = result.map((item) => item.month);
        const withdrawals = result.map((item) => item.totalWithdrawn);
        const deposits = result.map((item) => item.totalDeposited);

        // Update state
        setLabels(months);
        setWithdrawData(withdrawals);
        setDepositData(deposits);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Withdraw",
        data: withdrawData,
        backgroundColor: "black",
      },
      {
        label: "Deposited",
        data: depositData,
        backgroundColor: "yellow",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox">
          <div className="analysisDiv col m-2">
            <div>TOTAL MONEY WITHDRAWN/DEPOSITED</div>
            <Bar options={options} data={chartData} />
          </div>
          <div className="analysisDiv col m-2">
            <div>TOTAL MONEY WITHDRAWN/DEPOSITED (Line Chart)</div>
            <Line options={options} data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};
