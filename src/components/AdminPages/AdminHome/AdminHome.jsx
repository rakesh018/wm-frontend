import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';
import { Pagination } from './Pagination';

export const AdminHome = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();

  // Fetch data from API dynamically based on the current page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://server.trademax1.com/admin/users?page=${currentPage}`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
          }
        );
        const result = await response.json();
        setData(result.paginatedUsers || []); // Ensure `data` is always an array
        setTotalPages(result.totalPages || 1); // Default to 1 if undefined
        setTotalUsers(result.totalUsers || 0); // Default to 0 if undefined
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle row click
  const handleRowClick = (uid) => {
    navigate(`/viewUser/${uid}`);
  };

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="adminInnerBox d-flex justify-content-evenly">
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>UID</th>
                  {/* <th>NAME</th> */}
                  <th>PHONE NUMBER</th>
                  <th>EMAIL</th>
                  <th>DATE OF JOINING</th>
                  <th>ACCOUNT TYPE</th>
                  <th>WALLET BALANCE</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={row.uid} onClick={() => handleRowClick(row.uid)}>
                      <td>{row.uid}</td>
                      {/* <td>{row.name}</td> */}
                      <td>{row.phone}</td>
                      <td>{row.email}</td>
                      <td>{formatDate(row.createdAt)}</td> {/* Format the date here */}
                      <td>{row.userType}</td>
                      <td>{row.balance}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
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
    </div>
  );
};
