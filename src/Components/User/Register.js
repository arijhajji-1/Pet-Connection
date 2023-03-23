import React, { useRef,useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { login, register } from "./api";
import { useNavigate } from "react-router-dom";
import { Link,NavLink, Routes, Route } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import { createBrowserHistory } from 'history';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



function Register() {
  const history = createBrowserHistory();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState('');
  const [user, setUser] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // recaptcha validation ==========================
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const SITE_KEY = "6LdG_OQkAAAAAHTULkl1kxv161mv9mTUDQ3UM81w";
  const onChangeRe = value=>{
    console.log(value);
    setCaptchaToken(value);
  }




  const verify = () => {
      captchaRef.current.getResponse().then(res => {
          setCaptchaToken(res)
      })

  }
  const handleOnLoad = () => {
    window.location.reload();
    console.log("load LOAD ");
}
  // end recaptcha validation
  const handleSubmit = (event) => { // validation recaptcha
      event.preventDefault();
      captchaRef.current.reset();
      const token = captchaRef.current.getValue();
      

      // Form validation ================================

      const errors = {};

      if (username.trim() === "") {
          errors.username = "Username is required";
      }

      if (name.trim() === "") {
          errors.name = "Name is required";
      }

      if (email.trim() === "") {
          errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Email is invalid";
      }

      if (password.trim() === "") {
          errors.password = "Password is required";
      } else if (password.trim().length < 6) {
          errors.password = "Password must be at least 6 characters";
      }

      if (repass.trim() === "") {
          errors.repass = "Confirm password is required";
      } else if (password !== repass) {
          errors.repass = "Passwords do not match";
      }
      if (!captchaToken) {
          errors.ReCAPTCHAError = "Please verify reCAPTCHA";
      }
      setErrors(errors);
      

      // Object.keys(errors).length === 0
      if (Object.keys(errors).length === 0 /*&& token*/) {
          const user = {
              "username": username,
              "password": password,
              "name": name,
              "email": email,
              "token": captchaToken
          };

          register(user).then(data => { // window.location.reload()
              //navigate("/login")
              notify()

              history.push('/login');
              window.location.reload();
              console.log(data["data"])

              
          })
      }


      /*  event.preventDefault(); 
      
      if (password == repass) {
          const user = {
              'username': username,
              'password': password,
              'name': name,
              'email': email,
          };
          
          register(user).then(data => {
              //window.location.reload()
              navigate("/login")
              console.log(data["data"])
          })
      }*/

  }

  useEffect(() => {
      if (localStorage.getItem('user') != null) {
          navigate("/home")
      }
  }, [])

  const back = {
      backgroundColor: '#F6DDDD',
      margin: '70px',
      paddingTop: '50px',
      width: '40%',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      borderRadius: '10px'
  }






  const notify = () => toast.success(' 👤 check you mail please !', {
    position: "bottom-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });






  return (
      <>

          <div className="inner-page-banner">
          <ToastContainer />


              <div className="breadcrumb-vec-btm">
                  <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt=""/>
              </div>
              <div className="container">
                  <div className="row justify-content-center align-items-center text-center">
                      <div className="col-lg-6 align-items-center">
                          <div className="banner-content">
                              <h1>Register</h1>
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
                                  <img className="img-fluid" src="assets/images/bg/inner-banner-vec.png" alt=""/>
                              </div>
                              <img className="img-fluid" src="assets/images/bg/inner-banner-img.png" alt=""/>
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
                              <div className="form-wrapper wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                                  <div className="form-title">
                                      <h3>Sign Up</h3>
                                      <p>
                                          Already a Member?
                                          <Link to="/Login">
                                              Log In
                                          </Link>
                                      </p>
                                  </div>
                                  <form className="w-100"
                                      onSubmit={handleSubmit}>
                                      <div className="row">
                                          <div className="col-12">
                                              <div className="form-inner">
                                                  <label style={
                                                      {float: "left"}
                                                  }>Full Name
                                                  </label>
                                                  <input type="text" placeholder="Enter Your Name..."
                                                      value={name}
                                                      onChange={
                                                          (e) => setName(e.target.value)
                                                      }/>
                                              </div>
                                          </div>

                                          {
                                          errors.name && <p style={
                                              {
                                                  fontSize: 12,
                                                  color: "red"
                                              }
                                          }>
                                              {
                                              errors.name
                                          }</p>
                                      }

                                          <div className="col-12">
                                              <div className="form-inner">
                                                  <label style={
                                                      {float: "left"}
                                                  }>Username
                                                  </label>
                                                  <input type="text" placeholder="Enter Your Username..."
                                                      value={username}
                                                      onChange={
                                                          (e) => setUsername(e.target.value)
                                                      }/>
                                              </div>
                                          </div>
                                          {
                                          errors.username && <p style={
                                              {
                                                  fontSize: 12,
                                                  color: "red"
                                              }
                                          }>
                                              {
                                              errors.username
                                          }</p>
                                      }

                                          <div className="col-12">
                                              <div className="form-inner">
                                                  <label style={
                                                      {float: "left"}
                                                  }>Email
                                                  </label>
                                                  <input type="text" placeholder="Enter Your Email..."
                                                      value={email}
                                                      onChange={
                                                          (e) => setEmail(e.target.value)
                                                      }/>
                                              </div>
                                          </div>
                                          {
                                          errors.email && <p style={
                                              {
                                                  fontSize: 12,
                                                  color: "red"
                                              }
                                          }>
                                              {
                                              errors.email
                                          }</p>
                                      }

                                          <div className="col-12">
                                              <div className="form-inner">
                                                  <label style={
                                                      {float: "left"}
                                                  }>Password
                                                  </label>
                                                  <input type="password" name="password" id="password" placeholder="Enter Password..."
                                                      value={password}
                                                      onChange={
                                                          (e) => setPassword(e.target.value)
                                                      }/>
                                                  <i className="bi bi-eye-slash" id="togglePassword"></i>
                                              </div>
                                          </div>
                                          {
                                          errors.password && <p style={
                                              {
                                                  fontSize: 12,
                                                  color: "red"
                                              }
                                          }>
                                              {
                                              errors.password
                                          }</p>
                                      }


                                          <div className="col-12">
                                              <div className="form-inner">
                                                  <label style={
                                                      {float: "left"}
                                                  }>
                                                      Confirm Password{" "} </label>
                                                  <input type="password" name="repass" id="repass" placeholder="Retype Password..."
                                                      value={repass}
                                                      onChange={
                                                          (e) => setRepass(e.target.value)
                                                      }/>
                                                  <i className="bi bi-eye-slash" id="togglePassword"></i>
                                              </div>
                                          </div>
                                          {
                                          errors.repass && <p style={
                                              {
                                                  fontSize: 12,
                                                  color: "red"
                                              }
                                          }>
                                              {
                                              errors.repass
                                          }</p>
                                      }
                                          <ReCAPTCHA sitekey="6LddytQkAAAAACl6Fc5Gn-QVGhR85STUyN5I6_at"
                                              ref={captchaRef}
                                              onChange={onChangeRe}
                                              render="explicit"   
                                              onLoad={handleOnLoad}
                                          /> {
                                          errors.ReCAPTCHAError && <p style={
                                              {
                                                  fontSize: 12,
                                                  color: "red"
                                              }
                                          }>
                                              {
                                              errors.ReCAPTCHAError
                                          }</p>
                                      }

                                          <div className="col-12">
                                              <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                                                  <div className="form-group">
                                                      <input type="checkbox" id="html"/>
                                                      <label htmlFor="html">
                                                          I agree to the
                                                          <a href="#">Terms & Policy</a>
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
                                          &nbsp;Register
                                      </button>
                                  </form>
                                  <div className="alternate-signup-box">
                                      <h6>or signup WITH</h6>
                                      <div className="btn-group gap-4">
                                          <a href="#" className="eg-btn google-btn d-flex align-items-center">
                                              <i className="bx bxl-google"></i>
                                              <span>signup with google</span>
                                          </a>
                                          <a href="#" className="eg-btn facebook-btn d-flex align-items-center">
                                              <i className="bx bxl-facebook"></i>signup with facebook
                                          </a>

                                          <a href="#" className="eg-btn linkedin-btn d-flex align-items-center"
                                              style={
                                                  {backgroundColor: "green"}
                                          }>
                                              <i className="bx bxl-google"></i>
                                              <span>signup with linkedin</span>
                                          </a>
                                      </div>
                                  </div>


                                  <div className="form-poicy-area">
                                      <p>
                                          By clicking the "signup" button, you create a Cobiro
                                                                  account, and you agree to Cobiro's{" "}
                                          <a href="#">Terms & Conditions</a>
                                          &{" "}
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

export default Register;

//     const [name, setName] = useState(''); 
//     const [email, setEmail] = useState(''); 
//     const [password, setPassword] = useState('');
//     const [repass, setRepass] = useState('');   
//     const [user, setUser] = useState('');   

    
//     const navigate = useNavigate(); 

//     const handleSubmit = (event) => {
//         event.preventDefault(); 
        
//         if (password == repass) {
//             const user = {
//                 'username': username,
//                 'password': password,
//                 'name': name,
//                 'email': email,
//             };
            
//             register(user).then(data => {
//                 //window.location.reload()
//                 navigate("/login")
//                 console.log(data["data"])
//             })
//         }

        

//     }

//     useEffect(() => { 
//         if (localStorage.getItem('user') != null) { 
//             navigate("/home")
//         }
//      }, [])
    
//     const back = {
//         backgroundColor: '#F6DDDD',
//         margin: '70px',
//         paddingTop: '50px',
//         width: '40%',
//         boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
//         borderRadius : '10px'
        
//     }

//     return (
//       <>
//         <div className="inner-page-banner">
//           <div className="breadcrumb-vec-btm">
//             <img
//               className="img-fluid"
//               src="assets/images/bg/inner-banner-btm-vec.png"
//               alt=""
//             />
//           </div>
//           <div className="container">
//             <div className="row justify-content-center align-items-center text-center">
//               <div className="col-lg-6 align-items-center">
//                 <div className="banner-content">
//                   <h1>Register</h1>
//                   <nav aria-label="breadcrumb">
//                     <ol className="breadcrumb">
//                       <li className="breadcrumb-item">
//                         <a href="/">Home</a>
//                       </li>
//                       <li
//                         className="breadcrumb-item active"
//                         aria-current="page"
//                       >
//                         Login
//                       </li>
//                     </ol>
//                   </nav>
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="banner-img d-lg-block d-none">
//                   <div className="banner-img-bg">
//                     <img
//                       className="img-fluid"
//                       src="assets/images/bg/inner-banner-vec.png"
//                       alt=""
//                     />
//                   </div>
//                   <img
//                     className="img-fluid"
//                     src="assets/images/bg/inner-banner-img.png"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>




//         <center>
//           <div class="login-section pt-120 pb-120">
//             <div class="container">
//               <div class="row d-flex justify-content-center g-4">
//                 <div class="col-xl-6 col-lg-8 col-md-10">
//                   <div
//                     class="form-wrapper wow fadeInUp"
//                     data-wow-duration="1.5s"
//                     data-wow-delay=".2s"
//                   >
//                     <div class="form-title">
//                       <h3>Sign Up</h3>
//                       <p>
//                         Already a Member? <NavLink to="/Login"> Log In</NavLink>
//                       </p>
//                     </div>
//                     <form class="w-100" onSubmit={handleSubmit}>
//                       <div class="row">
//                         <div class="col-12">
//                           <div class="form-inner">
//                             <label style={{ float: "left" }}>Full Name </label>
//                             <input
//                               type="text"
//                               placeholder="Enter Your Name..."
//                               value={name}
//                               onChange={(e) => setName(e.target.value)}
//                             />
//                           </div>
//                         </div>

//                         <div class="col-12">
//                           <div class="form-inner">
//                             <label style={{ float: "left" }}>Username </label>
//                             <input
//                               type="text"
//                               placeholder="Enter Your Username..."
//                               value={username}
//                               onChange={(e) => setUsername(e.target.value)}
//                             />
//                           </div>
//                         </div>

//                         <div class="col-12">
//                           <div class="form-inner">
//                             <label style={{ float: "left" }}>Email </label>
//                             <input
//                               type="email"
//                               placeholder="Enter Your Email..."
//                               value={email}
//                               onChange={(e) => setEmail(e.target.value)}
//                             />
//                           </div>
//                         </div>

//                         <div class="col-12">
//                           <div class="form-inner">
//                             <label style={{ float: "left" }}>Password </label>
//                             <input
//                               type="password"
//                               name="password"
//                               id="password"
//                               placeholder="Enter Password..."
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <i class="bi bi-eye-slash" id="togglePassword"></i>
//                           </div>
//                         </div>

//                         <div class="col-12">
//                           <div class="form-inner">
//                             <label style={{ float: "left" }}>
//                               Confirm Password{" "}
//                             </label>
//                             <input
//                               type="password"
//                               name="repass"
//                               id="repass"
//                               placeholder="Retype Password..."
//                               value={repass}
//                               onChange={(e) => setRepass(e.target.value)}
//                             />
//                             <i class="bi bi-eye-slash" id="togglePassword"></i>
//                           </div>
//                         </div>

//                         <div class="col-12">
//                           <div class="form-agreement form-inner d-flex justify-content-between flex-wrap">
//                             <div class="form-group">
//                               <input type="checkbox" id="html" />
//                               <label for="html">
//                                 I agree to the <a href="#">Terms & Policy</a>
//                               </label>
//                             </div>
//                             <a href="#" class="forgot-pass">
//                               Forgotten Password
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                       <button class="account-btn">
//                         {" "}
//                         <i class="fa fa-paw" aria-hidden="true"></i>
//                         &nbsp;Register
//                       </button>
//                     </form>
                  
//                     <div class="form-poicy-area">
//                       <p>
//                         By clicking the "signup" button, you create a Cobiro
//                         account, and you agree to Cobiro's{" "}
//                         <a href="#">Terms & Conditions</a> &{" "}
//                         <a href="#">Privacy Policy.</a>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </center>
//       </>
//     );
// }

// export default Register;