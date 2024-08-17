import React, { useState, useEffect } from 'react';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import adminDeposit from '../../../images/adminTotalDeposit.png';
import adminWithdraw from '../../../images/adminTotalWithdraw.png';
import { useNavigate } from 'react-router-dom';
import './adminDeposit.css';
import { alertToast } from '../../../alertToast'; // Assuming alertToast is used for error handling

export const AutomaticDeposit = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed,setCompleted]=useState(0);
  const [pending,setPending]=useState(0);
  const [total,setTotal]=useState(0);
  const [rejected,setRejected]=useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://server.trademax1.com/admin/deposits/auto?page=${currentPage}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        // Make sure data.transactions and data.totalPages are defined
        setTransactions(data.paginatedAutoDeposits || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
        setCompleted(data?.segregatedAutoDeposits?.completed?.totalAmount || 0)
        setPending(data?.segregatedAutoDeposits?.pending?.totalAmount || 0)
        setRejected(data?.segregatedAutoDeposits?.rejected?.totalAmount || 0)
        setTotal(data?.segregatedAutoDeposits?.total?.totalAmount || 0)
      } catch (error) {
        setError(error.message);
        setLoading(false);
        alertToast('Error fetching transactions', 'error');
      }
    };

    fetchTransactions();
  }, [currentPage]); // Fetch data whenever the page changes

  const handleRowClick = (transactionId) => {
    navigate(`/viewUserTransaction/${transactionId}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
          <div className="d-flex justify-content-around">
            {/* Cards for Deposits and Withdrawals */}
            <div className="card text-center p-3 mx-2">
              <img src={adminDeposit} className="card-img-top mx-auto" alt="Total Amount" />
              <div className="card-body">
                <h5 className="card-title">TOTAL AMOUNT DEPOSITED</h5>
                <p className="card-text">{total}</p>
              </div>
            </div>
            <div className="card text-center p-3 mx-2">
              <img src={adminWithdraw} className="card-img-top mx-auto" alt="Successful Deposit" />
              <div className="card-body">
                <h5 className="card-title">SUCCESSFUL DEPOSIT</h5>
              <p className="card-text">{completed}</p>
              </div>
            </div>
            <div className="card text-center p-3 mx-2">
              <img src={adminWithdraw} className="card-img-top mx-auto" alt="Pending Deposit" />
              <div className="card-body">
                <h5 className="card-title">PENDING DEPOSIT</h5>
                <p className="card-text">{pending}</p>
              </div>
            </div>
            <div className="card text-center p-3 mx-2">
              <img src={adminWithdraw} className="card-img-top mx-auto" alt="Rejected Deposit" />
              <div className="card-body">
                <h5 className="card-title">REJECTED DEPOSIT</h5>
                <p className="card-text">{rejected}</p>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="Admin-data-table">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>GATEWAY</th>
                  <th>TRANSACTION ID</th>
                  <th>INITIATED</th>
                  <th>USER PHONE NUMBER</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={index} onClick={() => handleRowClick(transaction.transactionId)} style={{ cursor: 'pointer' }}>
                      <td>{transaction.gateway}</td>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.initiated}</td>
                      <td>{transaction.phone}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.status}</td>
                      <td><button className="btn btn-dark">DETAILS</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div>
              {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
                  style={{ margin: '0 5px' }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
