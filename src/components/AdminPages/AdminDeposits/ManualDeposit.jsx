import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../AdminHome/AdminNavbar';
import { AdminSidebar } from '../AdminHome/AdminSidebar';
import { Pagination } from '../AdminHome/Pagination';
import './manualDeposit.css'; // Include custom CSS for other styling
import Base_Url from '../../../config';

export const ManualDeposit = () => {
  const navigate = useNavigate();
  const adminToken=localStorage.getItem('adminToken');
  if(!adminToken){
    navigate('/adminLogin');
  }
  const [deposits, setDeposits] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("total"); 
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URLS = {
    total: "/manual", // Assuming this is the API for total deposits
    completed: "/manual/completed",
    pending: "/manual/pending",
    rejected: "/manual/rejected",
  };


  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(
          `${Base_Url}/admin/deposits/${API_URLS[currentFilter]}?page=${currentPage}`,

          {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
          }
        );
        if(response.status===403){
          navigate('/adminLogin');
        }
        const result = await response.json();
        setDeposits(result.paginatedManualDeposits || []);
        setTotalPages(result.totalPages || 1);

        setSummary({
          total: result.segregatedManualDeposits.total.totalAmount || 0,
          pending: result.segregatedManualDeposits.pending.totalAmount || 0,
          completed: result.segregatedManualDeposits.completed.totalAmount || 0,
          rejected: result.segregatedManualDeposits.rejected.totalAmount || 0,
        });

      } catch (error) {
        console.error('Error fetching deposits:', error);
      }
    };

    fetchDeposits();
  }, [currentPage,currentFilter]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (depositId) => {
    navigate(`/viewUserManualTransaction/${depositId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1); // Reset to the first page when filter changes
  };
  const getButtonClass = (filter) => {
    return filter === currentFilter ? 'highlit-button' : '';
  };
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <div className="container my-4">
          <h3 className="text-center mb-4 clad">Deposit List</h3>

          {/* Summary Boxes for Larger Screens */}
          <div className="row mb-4 d-none d-md-flex">
            <div onClick={() => handleFilterChange("total")} className={` deposit-button col-md-3`}>
              <div className={`${getButtonClass("total")} card p-3 text-center`}>
                <h5 className=''>Total Deposits</h5>
                <h6>{summary.total}</h6>
              </div>
            </div>
            <div  onClick={() => handleFilterChange("pending")} className="deposit-button col-md-3">
              <div className={`${getButtonClass("pending")} card p-3 text-center`}>
                <h5 className=''>Pending Deposits</h5>
                <h6>{summary.pending}</h6>
              </div>
            </div>
            <div onClick={() => handleFilterChange("completed")} className="deposit-button col-md-3">
              <div className={`${getButtonClass("completed")} card p-3 text-center`}>
                <h5>Completed Deposits</h5>
                <h6>{summary.completed}</h6>
              </div>
            </div>
            <div  onClick={() => handleFilterChange("rejected")} className="deposit-button col-md-3">
              <div className={`${getButtonClass("rejected")} card p-3 text-center`}>
                <h5>Rejected Deposits</h5>
                <h6>{summary.rejected}</h6>
              </div>
            </div>
          </div>

          {/* Summary Box for Small Screens */}
          <div className="d-block d-md-none mb-4">
            <div className="card p-3 bg-dark text-white">
              <div className="row">
                <div  onClick={() => handleFilterChange("total")} className="col-6 mb-2">
                  <button className={`${getButtonClass("total")} btn btn-outline-light w-100`}>
                    <h1 className='card-heading'>Total Deposits:</h1> {summary.total}
                  </button>
                </div>
                <div  onClick={() => handleFilterChange("pending")}  className="col-6 mb-2">
                  <button className={`${getButtonClass("pending")} btn btn-outline-light w-100`}>
                    <h1 className='card-heading'>Pending:</h1> {summary.pending}
                  </button>
                </div>
                <div  onClick={() => handleFilterChange("completed")}  className="col-6 mb-2">
                  <button className={`${getButtonClass("completed")} btn btn-outline-light w-100`}>
                    <h1 className='card-heading'>Completed:</h1> {summary.completed}
                  </button>
                </div>
                <div  onClick={() => handleFilterChange("rejected")} className="col-6 mb-2">
                  <button className={`${getButtonClass("rejected")} btn btn-outline-light w-100`}>
                    <h1 className='card-heading'>Rejected:</h1> {summary.rejected}
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
                  <th>Deposit ID</th>
                  <th>USER ID</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length > 0 ? (
                  deposits.map((deposit) => (
                    <tr key={deposit._id} onClick={() => handleRowClick(deposit._id)}>
                      <td>{deposit._id}</td>
                      <td>{deposit.uid}</td>
                      <td>{deposit.amount}</td>
                      <td>{deposit.status}</td>
                      <td>{formatDate(deposit.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No deposits found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for Small Screens */}
          <div className="row d-block d-md-none">
            {deposits.length > 0 ? (
              deposits.map((deposit) => (
                <div className="col-12 mb-4" key={deposit._id}>
                  <div
                    className="card p-3 h-100"
                    onClick={() => handleRowClick(deposit._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="mb-2">
                      <strong>Deposit ID:</strong> <span>{deposit._id}</span>
                    </div>
                    <div className="mb-2">
                      <strong>User ID:</strong> <span>{deposit.uid}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Amount:</strong> <span>{deposit.amount}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong> <span>{deposit.status}</span>
                    </div>
                    <div>
                      <strong>Date:</strong> <span>{formatDate(deposit.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info text-center">No deposits found</div>
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
