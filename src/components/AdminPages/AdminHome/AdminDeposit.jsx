import React from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import { useNavigate } from "react-router-dom";

export const AdminDeposit = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />

      <div className="container-fluid adminBox">
        <div
          className="adminInnerBox col-12 d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <div
            className="d-flex flex-column flex-md-row justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <button
              className="btn btn-success m-3 fs-6 fs-md-5"
              onClick={() => navigate("/automaticDeposit")}
            >
              AUTOMATIC DEPOSIT
            </button>
            <button
              className="btn btn-danger m-3 fs-6 fs-md-5"
              onClick={() => navigate("/manualDeposit")}
            >
              MANUAL DEPOSIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
