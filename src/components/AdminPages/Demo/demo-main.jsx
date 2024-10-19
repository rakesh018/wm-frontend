import React, { useState } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "./demo.css";
import { DemoAccount } from "./DemoAccount";
import { DemoAgent } from "./demo-agend";

import { useNavigate } from "react-router-dom";

export const DemoMainPage = () => {
    const navigate=useNavigate()
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex p-2 justify-content-center align-items-center ">
        <div className="d-flex p-2 justify-content-center align-items-center gap-5 ">
            <button onClick={() => navigate("/demoAccount")}  className="demo-btn-a">Demo Account</button>
            <button onClick={() => navigate("/demoagent")} className="demo-btn-a">Agent</button>
          </div>
        </div>
      </div>
    </div>
  );
};
