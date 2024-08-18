import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import adminDeposit from "../../../images/adminTotalDeposit.png";
import adminWithdraw from "../../../images/adminTotalWithdraw.png";
import { useNavigate } from "react-router-dom";
import "./adminDeposit.css";
import { alertToast } from "../../../alertToast"; // Assuming alertToast is used for error handling

export const AutomaticDeposit = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [total, setTotal] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://server.trademax1.com/admin/deposits/auto?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        } else if (response.status === 403) {
          //token error
          navigate("/adminLogin");
        }

        const data = await response.json();
        setTransactions(data.paginatedAutoDeposits || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
        setCompleted(data?.segregatedAutoDeposits?.completed?.totalAmount || 0);
        setPending(data?.segregatedAutoDeposits?.pending?.totalAmount || 0);
        setRejected(data?.segregatedAutoDeposits?.rejected?.totalAmount || 0);
        setTotal(data?.segregatedAutoDeposits?.total?.totalAmount || 0);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        alertToast("Error fetching transactions", "error");
      }
    };

    fetchTransactions();
  }, [currentPage]);

  const handleRowClick = (transactionId) => {
    navigate(`/viewUserTransaction/${transactionId}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <div className="container my-4">
          <h3 className="text-center mb-4">Automatic Deposit List</h3>

          {/* Summary Boxes for Larger Screens */}
          <div className="row mb-4 d-none d-md-flex">
            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h5>Total Deposits</h5>
                <h6>{total}</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h5>Successful Deposits</h5>
                <h6>{completed}</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h5>Pending Deposits</h5>
                <h6>{pending}</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center">
                <h5>Rejected Deposits</h5>
                <h6>{rejected}</h6>
              </div>
            </div>
          </div>

          {/* Summary Box for Small Screens */}
          <div className="d-block d-md-none mb-4">
            <div className="card p-3 bg-dark text-white">
              <div className="row">
                <div className="col-6 mb-2">
                  <button className="btn btn-outline-light w-100">
                    <strong>Total Deposits:</strong> {total}
                  </button>
                </div>
                <div className="col-6 mb-2">
                  <button className="btn btn-outline-light w-100">
                    <strong>Pending:</strong> {pending}
                  </button>
                </div>
                <div className="col-6 mb-2">
                  <button className="btn btn-outline-light w-100">
                    <strong>Completed:</strong> {completed}
                  </button>
                </div>
                <div className="col-6 mb-2">
                  <button className="btn btn-outline-light w-100">
                    <strong>Rejected:</strong> {rejected}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table for Larger Screens */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-striped table-bordered admin-table">
              <thead>
                <tr>
                  <th>Gateway</th>
                  <th>Transaction ID</th>
                  <th>Initiated</th>
                  <th>User Phone Number</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction.transactionId}
                      onClick={() => handleRowClick(transaction.transactionId)}
                    >
                      <td>{transaction.gateway}</td>
                      <td>{transaction.transactionId}</td>
                      <td>{formatDate(transaction.initiated)}</td>
                      <td>{transaction.phone}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.status}</td>
                      <td>
                        <button className="btn btn-dark">Details</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for Small Screens */}
          <div className="row d-block d-md-none">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div className="col-12 mb-4" key={transaction.transactionId}>
                  <div
                    className="card p-3 h-100"
                    onClick={() => handleRowClick(transaction.transactionId)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="mb-2">
                      <strong>Transaction ID:</strong>{" "}
                      <span>{transaction.transactionId}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Gateway:</strong>{" "}
                      <span>{transaction.gateway}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Initiated:</strong>{" "}
                      <span>{formatDate(transaction.initiated)}</span>
                    </div>
                    <div className="mb-2">
                      <strong>User Phone Number:</strong>{" "}
                      <span>{transaction.phone}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Amount:</strong> <span>{transaction.amount}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong> <span>{transaction.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  No transactions found
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`btn ${
                    currentPage === index + 1 ? "btn-primary" : "btn-light"
                  }`}
                  style={{ margin: "0 5px" }}
                >
                  {index + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
