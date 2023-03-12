import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { login } from "./api";
import { useNavigate } from "react-router-dom";
import { NavLink, Link, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode"; 
import ReCAPTCHA from "react-google-recaptcha";
import { createBrowserHistory } from 'history';

// import ReCAPTCHA from "react-google-recaptcha"
const history = createBrowserHistory();
function goToSignUp(){

  history.push('/register')
  window.location.reload();
}

function Login() {
  const history = createBrowserHistory();
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [user, setUser] = useState(''); 
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
      // form validation 
      const errors = {};
 if (username.trim() === "") {
        errors.username = "Username is required";
      }
      if (password.trim() === "") {
        errors.password = "Password is required";
      } else if (password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      setErrors(errors);
        event.preventDefault(); 
        
        if (Object.keys(errors).length === 0){
          const user = {
              'username': username,
              'password': password
          }; 
          
          login(user).then(data => {
              //window.location.reload()
              //navigate("/home")
              history.push('/login');
              window.location.reload();
              console.log(data["data"])
          });
        }

    }

    useEffect(() => {   
        if (localStorage.getItem('user') != null) { 
            navigate("/home")
        }
    },[])

    const back = {
        backgroundColor: '#F6DDDD',
        margin: '70px',
        paddingTop: '50px',
        width: '40%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius : '10px'
        
  }
  
 // ====== google =====
  function handleCallbackResponse(response) {
    console.log("Encoded JWT : " + response.credential); 
    var userObject = jwt_decode(response.credential); 
    console.log(userObject["family_name"]);
    
     

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: userObject["family_name"],
        email: userObject["email"],
        name: userObject["name"],
        image: userObject["picture"],
      })
    );
      navigate("/home");  
  }



  
  useEffect(() => {
    const google = window.google;  
    google.accounts.id.initialize({
      client_id:
        "607985557534-jakbgo8aau3rdivantjud5kji6o77560.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });

    google.accounts.id.renderButton (
      document.getElementById("signInDiv"),
        {theme : "outline" , size : "large"}
    );
    google.accounts.id.prompt()
  }, [])




    return (
      <>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>

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
                      <h3>Log In</h3>
                      <p>
                        New Member? <Link onClick={goToSignUp}> Sign Up</Link> 
                      </p>
                    </div>
                    <form className="w-100" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-inner">
                            <label style={{ float: "left" }}>Username </label>
                            <input
                              type="text"
                              placeholder="Enter Your Username..."
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          {errors.username && <p  style={{ fontSize: 12, color: "red" }}>{errors.username}</p>}

                        </div>
                        <div className="col-12">
                          <div className="form-inner">
                            <label style={{ float: "left" }}>Password </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Enter Password..."
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                              className="bi bi-eye-slash"
                              id="togglePassword"
                            ></i>
                          </div>
                          {errors.password && <p  style={{ fontSize: 12, color: "red" }}>{errors.password}</p>}
                        </div>
                        <div className="col-12">
                          <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                            <div className="form-group">
                              <input type="checkbox" id="html" />
                              <label htmlFor="html">
                                I agree to the <a href="#">Terms & Policy</a>
                              </label>
                            </div>
                            <a href="#" className="forgot-pass">
                              Forgotten Password
                            </a>
                          </div>
                        </div>
                      </div>
                      <button className="account-btn">
                        {" "}
                        <i className="fa fa-paw" aria-hidden="true"></i>
                        &nbsp;Log in
                      </button>
                    </form>
                    <div className="alternate-signup-box">
                      <h6>or signup WITH</h6>
                      <div className="btn-group gap-4">
                        {/* <a
                          id="signInDiv"
                          href="#"
                          className="eg-btn google-btn d-flex align-items-center"
                        >
                          <i className="bx bxl-google"></i>
                          <span>signup with google</span>
                        </a> */}
                        <div id="signInDiv"></div>
                        <a
                          href="#"
                          className="eg-btn facebook-btn d-flex align-items-center"
                        >
                          <i className="bx bxl-facebook"></i>signup with
                          facebook
                        </a>

                        <a
                          href="#"
                          className="eg-btn facebook-btn d-flex align-items-center"
                          style={{ backgroundColor: "green" }}
                        >
                          <i className="bx bxl-facebook"></i>signup with
                          linkedin
                        </a>
                      </div>
                    </div>
                    <div className="form-poicy-area">
                      <p>
                        By clicking the "signup" button, you create a Cobiro
                        account, and you agree to Cobiro's{" "}
                        <a href="#">Terms & Conditions</a> &{" "}
                        <a href="#">Privacy Policy.</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <script src="https://www.google.com/recaptcha/api.js?&render=explicit" async defer></script> */}
        </center>
      </>
    );
}

export default Login;