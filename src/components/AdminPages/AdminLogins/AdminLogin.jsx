import React from 'react';
import './adminLogin.css';
import logoImage from '../../../images/logoImage.jpeg';

export const AdminLogin = () => {
    return (
        <div className="container-fluid adminLogin">
            <div className="d-flex justify-content-center align-items-center text-center min-vh-100 flex-column flex-sm-row">
                <img className="logoImage order-0 order-sm-0" src={logoImage} alt="Logo" />
                <div className="adminLoginBox d-flex ms-5 order-1 order-sm-1">
                    <div className="login-container text-center mt-5">
                        <div className="login-box">
                            <div>
                                <button className="login-btn m-5">LOGIN WITH PHONE NUMBER</button>
                            </div>
                            <div className="icons">
                                <span className="material-symbols-outlined">smartphone</span>
                                <button className="login-btn">PHONE NUMBER</button>
                            </div>
                            <div>
                                <input type="text" className="login-input m-3" />
                            </div>
                            <div>
                                <span className="material-symbols-outlined">lock</span>
                                <button className="login-btn">PASSWORD</button>
                            </div>
                            <div style={{ margin: '16px 0', position: 'relative' }}>
                                <input type="text" className="login-input" style={{ width: '60%' }} />
                                <span className="material-symbols-outlined" style={{ position: 'absolute', right: '73px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>visibility_off</span>
                            </div>
                            <div>
                                <input type="radio" name="" id="" />
                                <label> remember password?</label>
                            </div>
                            <div>
                                <button className="login-btn m-3">LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
