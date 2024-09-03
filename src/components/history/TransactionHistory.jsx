import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { Sidebar } from "../../Sidebar";
import { BetSlip } from "../../BetSlip";
import "./history.css";
import { Spinner } from "react-bootstrap"; // Bootstrap spinner for loading state

export const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsHasMore, setTransactionsHasMore] = useState(true);
  const transactionsObserver = useRef();
  const lastTransactionsElementRef = useRef();

  // Fetching transaction history data
  useEffect(() => {
    const fetchTransactionsHistory = async () => {
      setTransactionsLoading(true);
      try {
        const response = await fetch(
          `https://server.trademax1.com/profile/get-transaction-history?page=${transactionsPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 403) {
          navigate("/login");
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { paginatedTransactions, totalPages } = data;

        const formattedTransactions = paginatedTransactions.map((transaction) => {
          transaction.createdAt = new Date(transaction.createdAt).toLocaleDateString();
          transaction.color =
            transaction.status === "pending"
              ? "orange"
              : transaction.status === "completed"
              ? "green"
              : "red";
          return transaction;
        });

        setTransactionsData((prev) => [...prev, ...formattedTransactions]);
        setTransactionsHasMore(transactionsPage < totalPages);
      } catch (error) {
        console.error("Error fetching transactions data:", error);
      } finally {
        setTransactionsLoading(false);
      }
    };

    fetchTransactionsHistory();
  }, [transactionsPage, navigate]);

  // Infinite scrolling with IntersectionObserver
  useEffect(() => {
    if (transactionsLoading) return;
    if (transactionsObserver.current) transactionsObserver.current.disconnect();
    const callback = (entries) => {
      if (entries[0].isIntersecting && transactionsHasMore) {
        setTransactionsPage((prev) => prev + 1);
      }
    };
    transactionsObserver.current = new IntersectionObserver(callback);
    if (lastTransactionsElementRef.current) {
      transactionsObserver.current.observe(lastTransactionsElementRef.current);
    }
  }, [transactionsLoading, transactionsHasMore]);

  return (
    <div>
      <Navbar /> {/* Including Navbar */}
      <div className="container historyBox mt-3">
        <div className="header-section d-flex justify-content-between align-items-center mb-3">
          <button className="history-title">Transaction History</button>
          {/* <button className="leaderboard-btn d-lg-none" onClick={() => navigate("/leaderboard")}>
            LEADERBOARD
          </button> */}
        </div>

        <div className="content-wrapper d-flex justify-content-between">
          {/* Transactions History */}
          <div className="transaction-list bg-white p-3 rounded shadow-sm">
            <h4 className="transaction-title mb-3">Your Transactions</h4>
            <div className="transaction-header d-flex justify-content-around fw-bold mb-2">
              <div>Date</div>
              <div style={{ marginLeft: '50px' }}>Transaction</div>
              <div>Amount</div>
            </div>

            {transactionsData.length === 0 && !transactionsLoading && (
              <p className="text-center text-muted">No transactions found.</p>
            )}

            {transactionsData &&
              transactionsData.map((item) => (
                <div className="transaction-item d-flex justify-content-around mb-2" key={item._id}>
                  <div>{item.createdAt}</div>
                  <div>{item.type}</div>
                  <div style={{ color: item.color, fontWeight: "bold" }}>
                    {item.amount}
                  </div>
                </div>
              ))}

            {transactionsLoading && (
              <div className="loading-spinner text-center my-3">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            <div ref={lastTransactionsElementRef} /> {/* Trigger for transactions observer */}
          </div>

          <Sidebar /> {/* Including Sidebar */}

          <div className="d-none d-lg-block betslip-wrapper">
            <BetSlip /> {/* Including BetSlip */}
          </div>
        </div>
      </div>
    </div>
  );
};
