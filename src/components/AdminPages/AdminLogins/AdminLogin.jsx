import React, { useState } from "react";
import "./adminLogin.css";
import logoImage from "../../../images/logoImage.jpeg";
import { alertToast } from "../../../alertToast";
import { useNavigate } from "react-router-dom";
import Base_Url from "../../../config";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const handleLogin = async () => {
    // Basic validation before sending login request
    try {
      if (!username || !password) {
        alertToast("Username and Password are required!", "warning");
        return;
      }
      const res = await fetch( `${Base_Url}/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const parsedRes = await res.json();
      if (res.ok) {
        const token=parsedRes.token;
        localStorage.setItem('adminToken',token);
        setTimeout(()=>{
            navigate('/adminHome');
        },1500)
        alertToast('Login successful','success');
      } else if(res.status===400) {
        alertToast(parsedRes.error,'error');
        return;
      }
    } catch (error) {
        alertToast('Error occured while login','error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid adminLogin mainBox">
      <div className="d-flex justify-content-center align-items-center text-center min-vh-100 flex-column flex-sm-row">
        <img
          className="logoImage order-0 order-sm-0"
          src={logoImage}
          alt="Logo"
        />
        <div className="adminLoginBox d-flex ms-5 order-1 order-sm-1">
          <div className="login-container text-center mt-5">
            <div className="login-box">
              <div>
                <button className="login-btn m-5">
                  LOGIN WITH PHONE NUMBER
                </button>
              </div>
              <div className="icons">
                <span className="material-symbols-outlined">smartphone</span>
                <button className="login-btn">USER NAME</button>
              </div>
              <div>
                <input
                  type="text"
                  className="login-input m-3"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <span className="material-symbols-outlined">lock</span>
                <button className="login-btn">PASSWORD</button>
              </div>
              <div style={{ margin: "16px 0", position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  style={{ width: "60%" }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="material-symbols-outlined"
                  style={{
                    position: "absolute",
                    right: "73px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </div>
              {/* <div>
                                <input type="radio" name="" id="" />
                                <label> Remember password?</label>
                            </div> */}
              <div>
                <button className="login-btn m-3" onClick={handleLogin}>
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
