import React, { useState } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "./demo.css";
import { alertToast } from "../../../alertToast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icons
import { useNavigate } from "react-router-dom";
import Base_Url from "../../../config";

export const Agent = () => {
  // State for form inputs
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [email, setEmail] = useState("");
  const [referal, setReferal] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send data to backend
      console.log(email, password,referal,number);
      const response = await fetch(
         `${Base_Url}/admin/agent/create-agent-account`, // Fixed URL scheme
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ email, password,referal,number }),
        }
      );
      const parsedRes = await response.json();
      if (response.ok) {
        alertToast("Agent account created", "success");
        setEmail("")
        setNumber("")
        setPassword("")
        setReferal("")
      }
      else if(response.status===403){
        navigate('/adminLogin');
      } 
      else {

        alertToast(`${parsedRes.errors}`, "error");

        
      }
    } catch (error) {
      console.error(error);
      alertToast(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column justify-content-center m-5">
            <form onSubmit={handleSubmit} className="dm_box">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control dm_input"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control dm_input"
                  placeholder="NUMBER"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control dm_input"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control dm_input"
                  placeholder="Referal"
                  value={referal}
                  onChange={(e) => setReferal(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary dm_btn m-3">
                CREATE AGENT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
