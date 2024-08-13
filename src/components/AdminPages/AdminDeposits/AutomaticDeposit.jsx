import React from 'react';
import { useState } from 'react';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import adminDeposit from '../../../images/adminTotalDeposit.png';
import adminWithdraw from '../../../images/adminTotalWithdraw.png';
import { useNavigate } from 'react-router-dom';
import './adminDeposit.css';

const transactions = [
  { gateway: 'PHONE PE', transactionId: '123456789', initiated: '22/02/2024', phone: '9876543210', amount: 1000, status: 'SUCCESS' },
  { gateway: 'PHONE PE', transactionId: '123456799', initiated: '22/02/2024', phone: '9876543910', amount: 1000, status: 'INITIATED' },
  { gateway: 'GOOGLE PAY', transactionId: '123459799', initiated: '22/02/2024', phone: '9876593910', amount: 1000, status: 'INITIATED' },
];

export const AutomaticDeposit = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(2);
  const navigate = useNavigate();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (transactionId) => {
    navigate(`/viewUserTransaction/${transactionId}`);
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
          <div className="d-flex justify-content-around">
            <div className="card text-center p-3 mx-2">
              <img src={adminDeposit} className="card-img-top mx-auto" alt="Total Amount" />
              <div className="card-body">
                <h5 className="card-title">TOTAL AMOUNT DEPOSITED</h5>
                <p className="card-text">10000</p>
              </div>
            </div>
            <div className="card text-center p-3 mx-2">
              <img src={adminWithdraw} className="card-img-top mx-auto" alt="Successful Deposit" />
              <div className="card-body">
                <h5 className="card-title">SUCCESSFUL DEPOSIT</h5>
                <p className="card-text">10000</p>
              </div>
            </div>
            <div className="card text-center p-3 mx-2">
              <img src={adminWithdraw} className="card-img-top mx-auto" alt="Pending Deposit" />
              <div className="card-body">
                <h5 className="card-title">PENDING DEPOSIT</h5>
                <p className="card-text">10000</p>
              </div>
            </div>
            <div className="card text-center p-3 mx-2">
              <img src={adminWithdraw} className="card-img-top mx-auto" alt="Rejected Deposit" />
              <div className="card-body">
                <h5 className="card-title">REJECTED DEPOSIT</h5>
                <p className="card-text">10000</p>
              </div>
            </div>
          </div>
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
                {currentRows.map((transaction, index) => (
                  <tr key={index} onClick={() => handleRowClick(transaction.transactionId)} style={{ cursor: 'pointer' }}>
                    <td>{transaction.gateway}</td>
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.initiated}</td>
                    <td>{transaction.phone}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.status}</td>
                    <td><button className="btn btn-dark">DETAILS</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {Array.from({ length: Math.ceil(transactions.length / rowsPerPage) }, (_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
