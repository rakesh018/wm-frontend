import React, { useState } from "react";
import "./agentlogin.css";
import { useNavigate } from "react-router-dom";
import { alertToast } from "../../../alertToast";
import { useEffect } from "react";
import Base_Url from "../../../config";

export const AgentLogin= () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("agentToken");
    if (token) {
      navigate("/agenthome");
    }
  }, [navigate]);

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch( `${Base_Url}/agent/agent-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("agentToken", data.agentToken);
        alertToast("Agent Login successful!", "success"); // Show success toast
        setTimeout(() => {
          navigate("/agenthome");
        }, 1500);
      } else {
        alertToast("Invalid credentials. Please try again.", "error"); // Show error toast
      }
    } catch (error) {
      alertToast("An error occurred while logging in.", "error"); // Show error toast
    }
  };

  return (
    <div className="container-fluid login d-flex justify-content-center col-sm-12 col-md-12">
      <form onSubmit={handleSignIn}>
        <div className="login-container text-center mt-5">
          <h1>Agent Login</h1>
          <div className="login-box">
            <div>
              <button
                type="button"
                className="login-btn m-5"
                onClick={() => alert("Login with phone number functionality")}
              >
                LOGIN WITH PHONE NUMBER
              </button>
            </div>
            <div className="icons">
              <span className="material-symbols-outlined">smartphone</span>
              <button
                type="button"
                className="login-btn"
                onClick={() => alert("Phone number login functionality")}
              >
                PHONE NUMBER
              </button>
            </div>
            <div>
              <input
                type="text"
                className="login-input m-3"
                id="emailOrPhone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
            <div>
              <span className="material-symbols-outlined">lock</span>
              <button
                type="button"
                className="login-btn"
                onClick={() => alert("Password login functionality")}
              >
                PASSWORD
              </button>
            </div>
            <div style={{ margin: "16px 0", position: "relative" }}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="login-input"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "60%" }}
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
                {isPasswordVisible ? "visibility" : "visibility_off"}
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="login-btn m-3"
              >
                LOGIN
              </button>
              <button
                type="button"
                className="login-btn m-3"
                onClick={() => navigate("/forgotPassword")}
              >
                FORGOT PASSWORD
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
