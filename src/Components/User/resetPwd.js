import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate ,useParams} from "react-router-dom";
import { NavLink, Routes, Route} from "react-router-dom";
import { resetPassword } from './api.js';
import axios from "axios";





function ResetPwd() {
  
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const {token}= useParams();


    const newPwd = async () =>{
     await axios.put('http://localhost:3000/user/resetpassword', {token,password})
      // await axios.put('http://localhost:3000/user/resetpassword', {password}, {
      //         headers: {Authorization: token}
      //     })
      history.push('/login');
      window.location.reload();

    }

    
    const navigate = useNavigate(); 
    const sendLink = async (e) => {
      console.log(token)
      resetPassword();

     
    };
    


    useEffect(() => { 
       
     }, [])
    
    const back = {
        backgroundColor: '#F6DDDD',
        margin: '70px',
        paddingTop: '50px',
        width: '40%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius : '10px'
        
    }

    return (
      <>
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
                  <h1>Forget Password</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
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
          <div class="login-section pt-120 pb-120">
            <div class="container">
              <div class="row d-flex justify-content-center g-4">
                <div class="col-xl-6 col-lg-8 col-md-10">
                  <div
                    class="form-wrapper wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                  >
                    <div class="form-title">
                      <h3>Enter Your new Password</h3>
                      
                    </div>
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword Succsfully Updated</p> : ""}
                    {/* <form class="w-100" > */}
                      <div class="row">
                        <div class="col-12">
                          <div class="form-inner">
                            <label style={{ float: "left" }}>New Password </label>
                            <input
                              type="text"
                              placeholder="Enter Your New Password..."
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <button className="account-btn"onClick={()=> newPwd() }>
                        {" "}
                        <i className="fa fa-paw" ></i>
                        &nbsp;Send
                      </button>
                    {/* </form> */}
                   
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </>
    );
}


export default ResetPwd;