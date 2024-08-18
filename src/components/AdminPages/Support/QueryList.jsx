import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "./queries.css";
import { alertToast } from "../../../alertToast";
import { useNavigate } from "react-router-dom";


export const QueryList = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [queries, setQueries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch queries from backend
  const fetchQueries = async (page) => {
    try {
      const response = await fetch(`https://server.trademax1.com/admin/query/get-all-queries?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setQueries(data.queries);
        setTotalPages(data.totalPages);
      } 
      else if(response.status===403){
        navigate('/adminLogin');
      }
      else {
        alertToast("Error fetching queries", "error");
      }
    } catch (error) {
      console.error(error);
      alertToast("Error fetching queries", "error");
    }
  };

  useEffect(() => {
    fetchQueries(page);
  }, [page]);

  // Handler to mark a query as seen
  const handleMarkSeen = async (queryId) => {
    try {
      const response = await fetch(`https://server.trademax1.com/admin/query/mark-query-seen/${queryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alertToast("Query marked as seen", "success");
        fetchQueries(page); // Refresh the list after marking as seen
      }
      else if(response.status===403){
        navigate('/adminLogin');
      } 
      else {
        alertToast(data.error, "error");
      }
    } catch (error) {
      console.error(error);
      alertToast("Error marking query as seen", "error");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column justify-content-center m-5">
            <h2 className="text-center mb-4">Queries</h2> {/* Added heading here */}
            <div className="queriesBox">
              {queries.length > 0 ? (
                queries.map((query) => (
                  <div key={query.uid} className="queryCard mb-3 p-3 border rounded">
                    <h5>User ID: {query.uid}</h5>
                    <p className="queryMessage">{query.message}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMarkSeen(query._id)}
                    >
                      Mark as Seen
                    </button>
                  </div>
                ))
              ) : (
                <p>No queries found</p>
              )}
              <div className="pagination mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="mx-3">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
