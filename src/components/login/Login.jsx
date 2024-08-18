import React, { useRef } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { alertToast } from "../../alertToast";

export const Login = () => {
  const emailOrPhoneRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https:server.trademax1.com/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhone: emailOrPhoneRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occured while loggin in.");
    }
  };
  const navigate = useNavigate();
  return (
    
    <div className="container-fluid login d-flex justify-content-center col-sm-12 col-md-12">
      
      <form action="">
        <div className="login-container  text-center mt-5">
          <div className="login-box ">
            <div>
              <button className="login-btn m-5">LOGIN WITH PHONE NUMBER</button>
            </div>
            <div className="icons">
              <span class="material-symbols-outlined">smartphone</span>
              <button className="login-btn">PHONE NUMBER</button>
            </div>
            <div>
              <input
                type="text"
                className="login-input m-3"
                id="emailOrPhone"
                ref={emailOrPhoneRef}
              />
            </div>
            <div>
              <span class="material-symbols-outlined">lock</span>
              <button className="login-btn">PASSWORD</button>
            </div>
            <div style={{ margin: "16px 0", position: "relative" }}>
              <input
                type="text"
                className="login-input"
                id="password"
                ref={passwordRef}
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
              >
                visibility_off
              </span>
            </div>
            {/* <div>
              <input type="radio" name="" id="" />
              <label> remember password?</label>
            </div> */}
            <div>
              <button className="login-btn m-3" onClick={handleSignIn}>
                LOGIN
              </button>
              <button
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
