import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import successWithdraw from '../../../images/successfulWithdraw.png';
import pendingWithdraw from '../../../images/pendingWithdraw.png';
import rejectedWithdraw from '../../../images/rejectedWithdraw.png';

const transactions = [
    { gateway: 'PHONE PE', transactionId: '123456789', initiated: '22/02/2024', phone: '9876543210', amount: 1000, status: 'SUCCESS' },
    { gateway: 'GOOGLE PAY', transactionId: '123456799', initiated: '22/02/2024', phone: '9876543910', amount: 1000, status: 'PENDING' },
];

export const AdminWithdraw = () => {
    const navigate = useNavigate();

    const handleRowClick = (transactionId) => {
        navigate(`/viewUserWithdrawTransaction/${transactionId}`);
    };

    return (
        <div>
            <AdminNavbar />
            <AdminSidebar />
            <div className="container-fluid adminBox">
                <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
                    <div className="d-flex justify-content-around">
                        <div className="card text-center p-3 mx-2">
                            <img src={successWithdraw} className="card-img-top mx-auto" alt="Total Amount" />
                            <div className="card-body">
                                <h5 className="card-title">TOTAL AMOUNT DEPOSITED</h5>
                                <p className="card-text">10000</p>
                            </div>
                        </div>
                        <div className="card text-center p-3 mx-2">
                            <img src={pendingWithdraw} className="card-img-top mx-auto" alt="Successful Deposit" />
                            <div className="card-body">
                                <h5 className="card-title">SUCCESSFUL DEPOSIT</h5>
                                <p className="card-text">10000</p>
                            </div>
                        </div>
                        <div className="card text-center p-3 mx-2">
                            <img src={rejectedWithdraw} className="card-img-top mx-auto" alt="Pending Deposit" />
                            <div className="card-body">
                                <h5 className="card-title">PENDING DEPOSIT</h5>
                                <p className="card-text">10000</p>
                            </div>
                        </div>
                    </div>
                    <div className="withDrawTable">
                        <table>
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
                                {transactions.map((transaction, index) => (
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
                    </div>
                </div>
            </div>
        </div>
    );
};
