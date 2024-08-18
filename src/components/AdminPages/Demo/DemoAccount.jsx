import React, { useState } from "react";
import { AdminNavbar } from "../AdminHome/AdminNavbar";
import { AdminSidebar } from "../AdminHome/AdminSidebar";
import "./demo.css";
import { alertToast } from "../../../alertToast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icons
import { useNavigate } from "react-router-dom";

export const DemoAccount = () => {
  // State for form inputs
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    navigate("/adminLogin");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send data to backend
      console.log(email, password, amount);
      const response = await fetch(
        "https://server.trademax1.com/admin/demo/create-demo-account", // Fixed URL scheme
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ email, password, balance: amount }),
        }
      );
      const parsedRes = await response.json();
      if (response.ok) {
        alertToast("Demo account created", "success");
        // Clear form fields if needed
      }
      else if(response.status===403){
        navigate('/adminLogin');
      } 
      else {
        alertToast(`${parsedRes.error}`, "error");
      }
    } catch (error) {
      console.error(error);
      alertToast("Error creating demo account", "error");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className="container-fluid adminBox">
        <div className="row adminInnerBox d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column justify-content-center m-5">
            <form onSubmit={handleSubmit} className="demoBox">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control demoInput"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control demoInput"
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
                  type="number"
                  className="form-control demoInput"
                  placeholder="AMOUNT"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary demoBtn m-3">
                CREATE DEMO ACCOUNT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
