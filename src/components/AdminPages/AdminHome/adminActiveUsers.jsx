import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { Pagination } from "./Pagination";
import "./adminHome.css"; // Include custom CSS for better control over styling
import Base_Url from "../../../config";

export const ActiveUsers = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchId, setSearchId] = useState(""); // State for search input
  const [dropSelected, setDropSelect] = useState(null);
  const [isdropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_Url}/admin/users/active?page=${currentPage}&filterType=${dropSelected}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        if (response.status === 403) {
          localStorage.removeItem("adminToken");
          navigate("/adminLogin");
        }
        const result = await response.json();
        console.log(result);

        setData(result.paginatedUsersWithBets || []);
        setTotalPages(result.totalPages || 1);
        setTotalUsers(result.totalUsersWithBets || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage,dropSelected]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (uid) => {
    navigate(`/viewUser/${uid}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = () => {
    if (searchId.trim()) {
      navigate(`/viewUser/${searchId}`);
    }
  };

  const DropdownComponent = () => {
   let displaytime="select time"
   if(dropSelected=="1d"){
    displaytime="1 Day"
   }
   else if(dropSelected=="1w"){
    displaytime="1 Week"
   }
   else if(dropSelected=="1m"){
    displaytime="1 Month"
   }
   else if(dropSelected=="1y"){
    displaytime="1 Year"
   }
    return (
      <div className="dropdown-bg-container">
        <h1
          onClick={() => setDropOpen(!isdropOpen)}
          className="dropdown-heading"
        >
          <p className={`arrow-dropdown ${isdropOpen ? 'rotate' : ''}`}></p>
         {dropSelected!=null?displaytime:"select time"}
        </h1>
        {isdropOpen && (
          <ul className="dropdown-options-bg">
            
            <li
              onClick={() => {
                setDropOpen(!isdropOpen);
                setDropSelect("1d");
              }}
            >
              1 Day
            </li>
            <li
              onClick={() => {
                setDropOpen(!isdropOpen);
                setDropSelect("1w");
              }}
            >
              1 Week
            </li>
            <li
              onClick={() => {
                setDropOpen(!isdropOpen);
                setDropSelect("1m");
              }}
            >
              1 Month
            </li>
            <li
              onClick={() => {
                setDropOpen(!isdropOpen);
                setDropSelect("1y");
              }}
            >
              1 Year
            </li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="main-content flex-grow-1">
        <AdminNavbar />
        <div className="container my-4">
          <div className="admin-home-active-heading">
            <h3 className="">Active Users</h3>
            <div>{DropdownComponent()}</div>
          </div>
          {/* Search Input */}
          <div className="mb-4 d-flex justify-content-center">
            <input
              type="text"
              id="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter UID to search"
              className="form-control me-2"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>

          {/* Table for Larger Screens */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-striped table-bordered admin-table">
              <thead>
                <tr>
                  <th>UID</th>
                  <th>TotalBetAmount</th>
                  <th>TotalLoss</th>
                  <th>TotalProfit</th>
                  {/* <th>ACCOUNT TYPE</th>
                  <th>WALLET BALANCE</th> */}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <tr key={row.uid} onClick={() => handleRowClick(row.uid)}>
                      <td>{row.uid}</td>
                      <td>{row.totalBetAmount}</td>
                      <td>{row.totalLoss}</td>
                      <td>{row.totalProfit}</td>
                      {/* <td>{row.userType}</td>
                      <td>{row.balance + row.withdrawableBalance}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for Small Screens */}
          <div className="row d-block d-md-none">
            {data.length > 0 ? (
              data.map((user) => (
                <div className="col-12 mb-4" key={user.uid}>
                  <div
                    className="card p-3 h-100"
                    onClick={() => handleRowClick(user.uid)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="mb-2">
                      <strong>UID:</strong> <span>{user.uid}</span>
                    </div>
                    <div className="mb-2">
                      <strong>TotalBetAmount:</strong>{" "}
                      <span>{user.totalBetAmount}</span>
                    </div>
                    <div className="mb-2">
                      <strong>TotalLoss:</strong> <span>{user.totalLoss}</span>
                    </div>
                    <div className="mb-2">
                      <strong>TotalProfit:</strong>{" "}
                      <span>{user.totalProfit}</span>
                    </div>
                    {/* <div className="mb-2">
                      <strong>Account Type:</strong>{" "}
                      <span>{user.userType}</span>
                    </div>
                    <div>
                      <strong>Wallet Balance:</strong>{" "}
                      <span>{user.balance + user.withdrawableBalance}</span>
                    </div> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  No users found
                </div>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center pagination-container">
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
