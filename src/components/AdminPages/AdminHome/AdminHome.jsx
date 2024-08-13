import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';
import { Pagination } from './Pagination';

const data = [
  { uid: '123456789', name: 'Lohith', phone: '9087564321', email: 'lohith@gmail.com', date: '10/12/2022', type: 'Regular', balance: '50000' },
  { uid: '123456799', name: 'Karthik', phone: '9087564331', email: 'karthik@gmail.com', date: '11/12/2022', type: 'Demo', balance: '50000' },
  { uid: '123456739', name: 'Rohith', phone: '9087563321', email: 'rohith@gmail.com', date: '10/12/2022', type: 'Regular', balance: '50000' },
  { uid: '123456239', name: 'Karthikeya', phone: '9087124331', email: 'karthikeya@gmail.com', date: '11/12/2022', type: 'Regular', balance: '50000' },
 
];

export const AdminHome = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(2);
  const navigate = useNavigate();

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle row click
  const handleRowClick = (uid) => {
    navigate(`/viewUser/${uid}`);
  };

  return (
    <div>
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
                    <th>NAME</th>
                    <th>PHONE NUMBER</th>
                    <th>EMAIL</th>
                    <th>DATE OF JOINING</th>
                    <th>ACCOUNT TYPE</th>
                    <th>WALLET BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={index} onClick={() => handleRowClick(row.uid)}>
                      <td>{row.uid}</td>
                      <td>{row.name}</td>
                      <td>{row.phone}</td>
                      <td>{row.email}</td>
                      <td>{row.date}</td>
                      <td>{row.type}</td>
                      <td>{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='d-flex justify-content-center'>
                <Pagination
                  rowsPerPage={rowsPerPage}
                  totalRows={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
