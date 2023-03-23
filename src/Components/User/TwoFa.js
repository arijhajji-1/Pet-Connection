import React, { useState } from 'react';
import { verify2FA } from './api';
import { useNavigate } from 'react-router-dom';

function TwoFa() {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
  
    const handleVerify2FA = async () => {
      try {
        const id = JSON.parse(localStorage.getItem('user'))._id||JSON.parse(localStorage.getItem('user')).facebookId;
  
        const response = await verify2FA(id, token);
        console.log(response);
        setMessage('Two-Factor Authentication has been verified');
        setVerified(true);
        window.location.href = '/home';
      } catch (error) {
        console.log(error.message);
        setMessage('Invalid OTP token');
      }
    };
    return ( <>
    
        <div className="inner-page-banner">
          <div className="breadcrumb-vec-btm">
            <img
              className="img-fluid"
              src="assets/images/bg/inner-banner-btm-vec.png"
              alt=""
            />
          </div>
          <div className="container">
            <div className="row justify-content-center align-items-center text-center">
              <div className="col-lg-6 align-items-center">
                <div className="banner-content">
                  <h1>Login</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Login
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-img d-lg-block d-none">
                  <div className="banner-img-bg">
                    <img
                      className="img-fluid"
                      src="assets/images/bg/inner-banner-vec.png"
                      alt=""
                    />
                  </div>
                  <img
                    className="img-fluid"
                    src="assets/images/bg/inner-banner-img.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <center>
          <div className="login-section pt-120 pb-120">
            <div className="container">
              <div className="row d-flex justify-content-center g-4">
                <div className="col-xl-6 col-lg-8 col-md-10">
                  <div
                    className="form-wrapper wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                  >
                    <div className="form-title">
                      <h3>TwoFactorVerification</h3>
                      <input type="text" onChange={(e) => setToken(e.target.value)} />
                      <button className="account-btn" onClick={handleVerify2FA}>
                        Verify Two-Factor Authentication
                      </button>
                      <p>{message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </> );
}

export default TwoFa;