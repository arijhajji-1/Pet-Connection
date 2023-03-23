import React from 'react';
import axios from 'axios';
import { disable2FA } from './api';

function DisableTwoFactorAuth() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDisable2FA = async () => {
    try {
      const id = user._id||user.facebookId;
      const response = await disable2FA(id);
      console.log('Two-Factor Authentication has been disabled');
      console.log('Response:', response.data);
      alert("2fa has been disabled");
      
      // or update the state of your component to reflect the change
    } catch (error) {
      console.log('Error disabling Two-Factor Authentication:', error);
      // or display an error message to the user
    }
  };

  return (
    <>
 <div className="inner-page-banner">
          
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
                
            <div className="form-title">
            <button className="account-btn" onClick={handleDisable2FA}>Disable Two-Factor Authentication</button>
    

            </div>
    </div>
    </div>
    </div>
    </div>
    </center>

    </>
  );
};

export default DisableTwoFactorAuth;
