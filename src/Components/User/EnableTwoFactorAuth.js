import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Qrcode from 'qrcode.react';
import { enable2FA } from './api';
import QRCode from "qrcode.react";

function EnableTwoFactorAuth() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const User = JSON.parse(localStorage.getItem("user"));
  const token = User.accessToken;

  const handleEnable2FA = () => {
    const id = User._id||User.facebookId;
    console.log(id)
    
    enable2FA(id)
      .then((response) => {
        const qrCode = response.data.qrCode;
        const secret = response.data.secret;
        console.log(qrCode);
        console.log(secret);
        setQrCodeData(qrCode);
        setSecretKey(secret);
        setShowResults(true);
      })
      .catch((error) => {
        console.log("khlet 2");
      });
  };

  const qrStyle = {
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    backgroundColor: 'white',
  }
  

  
  const QR = () => (
    <div style={qrStyle}>
      <img src={qrCodeData} alt="QR Code" />
      <p>secretKey {secretKey}</p>
    </div>
  );

  useEffect(() => {
    if (showResults && qrCodeData) {
      console.log("qrCodeData", qrCodeData);
    }
  }, [qrCodeData, showResults]);

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
    <h3> Enable Two-Factor Authentication</h3>
      <button className="account-btn" onClick={handleEnable2FA}>
       Enable
      </button>
      {showResults ? <QR /> : null}
    </div>
    </div>
    </div>
    </div>
    </div>
    </center>
    </>
  );
}




export default EnableTwoFactorAuth;
