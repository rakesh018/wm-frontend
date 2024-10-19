import React, { useState } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";

import "./adminpass.css"
import { useNavigate } from "react-router-dom";

export const AdminPassChange = () => {
    const navigate=useNavigate()
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex p-2 justify-content-center align-items-center ">
        <div className="d-flex p-2 justify-content-center flex-column align-items-center gap-2  adminpasscontainer">
         <h1 className="adminpassheading">Change Password</h1>
         <div className="adminpasschange">
            <p>Old Password</p>
            <input type="text"/>
         </div>
         <div className="adminpasschange">
            <p>New Password</p>
            <input type="text"/>
         </div>
         <button className="adminpasschnagebtn">Change</button>
          </div>
        </div>
      </div>
    </div>
  );
};
