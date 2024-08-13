import React from 'react';
import { useParams } from 'react-router-dom';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';

const transactions = [
    { gateway: 'PHONE PE', transactionId: '123456789', initiated: '22/02/2024', phone: '9876543210', amount: 1000, status: 'SUCCESS' },
    { gateway: 'PHONE PE', transactionId: '123456799', initiated: '22/02/2024', phone: '9876543910', amount: 1000, status: 'INITIATED' },
    { gateway: 'GOOGLE PAY', transactionId: '123459799', initiated: '22/02/2024', phone: '9876593910', amount: 1000, status: 'INITIATED' },
];

export const ViewUserTransaction = () => {
    const { uid } = useParams();
    const transaction = transactions.find((t) => t.transactionId === uid);

    return (
        <div>
            <AdminNavbar />
            <AdminSidebar />
            <div className="container-fluid adminBox">
                <div className="adminInnerBox col-12" style={{ height: '70vh' }}>
                    <div className='d-flex justify-content-center'>
                        <div className='adminDepositBox text-center mt-3 p-3'>
                    {transaction ? (
                        <div>
                            <h2>Deposit via {transaction.gateway}</h2>
                            <p>Transaction ID: {transaction.transactionId}</p>
                            <p>DATE:{transaction.initiated}</p>
                            <p>PHONE NUMER: {transaction.phone}</p>
                            <p>AMOUNT: {transaction.amount}</p>
                            <p>STATUS: {transaction.status}</p>
                        </div>
                    ) : (
                        <p>Transaction not found</p>
                    )}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
