import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { Pagination } from '../AdminHome/Pagination';
import successWithdraw from '../../../images/successfulWithdraw.png';
import pendingWithdraw from '../../../images/pendingWithdraw.png';
import rejectedWithdraw from '../../../images/rejectedWithdraw.png';
import './adminWithdraw.css'; // Include custom CSS for other styling

export const AdminWithdraw = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        total: 0,
        pending: 0,
        completed: 0,
        rejected: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWithdrawals = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://server.trademax1.com/admin/withdrawals/get-all-withdrawals?page=${currentPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch withdrawals');
                }

                const data = await response.json();
                setTransactions(data.paginatedWithdrawals || []);
                setTotalPages(data.totalPages || 1);
                setSummary({
                    total: data.segregatedWithdrawals.total.totalAmount || 0,
                    pending: data.segregatedWithdrawals.pending.totalAmount || 0,
                    completed: data.segregatedWithdrawals.completed.totalAmount || 0,
                    rejected: data.segregatedWithdrawals.rejected.totalAmount || 0,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWithdrawals();
    }, [currentPage]);

    const handleRowClick = (transactionId) => {
        navigate(`/viewUserWithdrawTransaction/${transactionId}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="d-flex">
            <AdminSidebar />
            <div className="flex-grow-1">
                <AdminNavbar />
                <div className="container my-4">
                    <h3 className="text-center mb-4">Withdrawal List</h3>

                    {/* Summary Boxes for Larger Screens */}
                    <div className="row mb-4 d-none d-md-flex">
                        <div className="col-md-3">
                            <div className="card p-3 text-center">
                                <h5>Total Withdrawals</h5>
                                <h6>{summary.total}</h6>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card p-3 text-center">
                                <h5>Pending Withdrawals</h5>
                                <h6>{summary.pending}</h6>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card p-3 text-center">
                                <h5>Completed Withdrawals</h5>
                                <h6>{summary.completed}</h6>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card p-3 text-center">
                                <h5>Rejected Withdrawals</h5>
                                <h6>{summary.rejected}</h6>
                            </div>
                        </div>
                    </div>

                    {/* Summary Box for Small Screens */}
                    <div className="d-block d-md-none mb-4">
                        <div className="card p-3 bg-dark text-white">
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <button className="btn btn-outline-light w-100">
                                        <strong>Total :</strong> {summary.total}
                                    </button>
                                </div>
                                <div className="col-6 mb-2">
                                    <button className="btn btn-outline-light w-100">
                                        <strong>Pending:</strong> {summary.pending}
                                    </button>
                                </div>
                                <div className="col-6 mb-2">
                                    <button className="btn btn-outline-light w-100">
                                        <strong>Completed:</strong> {summary.completed}
                                    </button>
                                </div>
                                <div className="col-6 mb-2">
                                    <button className="btn btn-outline-light w-100">
                                        <strong>Rejected:</strong> {summary.rejected}
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
                                    <th>User ID</th>
                                    <th>Withdrawal ID</th>
                                    <th>Initiated</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction) => (
                                        <tr key={transaction._id} onClick={() => handleRowClick(transaction._id)}>
                                            <td>{transaction.uid}</td>
                                            <td>{transaction._id}</td>
                                            <td>{formatDate(transaction.createdAt)}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.status}</td>
                                            <td>
                                                <button className="btn btn-dark">Details</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No withdrawals found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards for Small Screens */}
                    <div className="row d-block d-md-none">
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <div className="col-12 mb-4" key={transaction._id}>
                                    <div
                                        className="card p-3 h-100"
                                        onClick={() => handleRowClick(transaction._id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="mb-2">
                                            <strong>Withdrawal ID:</strong> <span>{transaction._id}</span>
                                        </div>
                                        <div className="mb-2">
                                            <strong>User ID:</strong> <span>{transaction.uid}</span>
                                        </div>
                                        <div className="mb-2">
                                            <strong>Amount:</strong> <span>{transaction.amount}</span>
                                        </div>
                                        <div className="mb-2">
                                            <strong>Status:</strong> <span>{transaction.status}</span>
                                        </div>
                                        <div>
                                            <strong>Date:</strong> <span>{formatDate(transaction.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="alert alert-info text-center">No withdrawals found</div>
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination
                            totalPages={totalPages}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
