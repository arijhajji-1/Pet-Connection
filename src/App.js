//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import {  Route, Routes } from 'react-router-dom';

import { useScript } from 'usehooks-ts'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Components/Pages/Loading";
import TwoFa from "./Components/User/TwoFa";
import { loadStripe } from "@stripe/stripe-js";

//import TwoFactorVerification from "./Components/User/TwoFactorVerification";


const Home = React.lazy(() => import('./Components/Pages/Home.js'))
const Header = React.lazy(() => import('./Components/Pages/Header'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Market = React.lazy(()=> import ('./Components/Pages/Market'))
const About = React.lazy(() => import('./Components/Pages/About'))
const Login = React.lazy(() => import('./Components/User/login'))
const Register = React.lazy(()=> import ('./Components/User/register'))
const EnableTwoFactorAuth = React.lazy(()=> import('./Components/User/EnableTwoFactorAuth'))
const DisableTwoFactorAuth = React.lazy(()=> import('./Components/User/DisableTwoFactorAuth'))

const ForgetPwd = React.lazy(()=> import ('./Components/User/forgetPwd'))
const ResetPwd = React.lazy(()=> import ('./Components/User/resetPwd'))
const Profile = React.lazy(()=> import ('./Components/User/Profile'))
const Shop = React.lazy(()=> import ('./Components/MarketPlace/shop'))
const Cart = React.lazy(()=> import ('./Components/MarketPlace/cart'))

const Details = React.lazy(()=> import ('./Components/MarketPlace/details'))
const Checkout = React.lazy(()=> import ('./Components/MarketPlace/checkout'))
const Paymenet = React.lazy(()=> import ('./Components/MarketPlace/payment'))
const Woah=React.lazy(()=>import("./Components/MarketPlace/woah"));
const Scrap=React.lazy(()=>import("./Components/MarketPlace/scrape"));

import { Elements } from "@stripe/react-stripe-js";



function App() {
useScript("./assets/js/email-decode.min.js");

useScript("./assets/js/jquery-3.6.0.min.js"); 

useScript("./assets/js/jquery-ui.js");
useScript("./assets/js/jquery.timepicker.min.js");
useScript("./assets/js/bootstrap.bundle.min.js");
useScript("./assets/js/swiper-bundle.min.js");
useScript("./assets/js/jquery.nice-select.js");
useScript("./assets/js/jquery.fancybox.min.js");
useScript("./assets/js/morphext.min.js");
useScript("./assets/js/odometer.min.js")
useScript("./assets/js/jquery.marquee.min.js");
useScript("./assets/js/viewport.jquery.js");
useScript("./assets/js/isotope.pkgd.min.js");
useScript("./assets/js/SmoothScroll.js");
useScript("./assets/js/jquery.nice-number.min.js");
useScript("./assets/js/jquery.magnific-popup.min.js");
useScript("./assets/js/masonry.pkgd.min.js");
  useScript("./assets/js/main.js");
  
  const [isLoaded, setIsLoaded] = useState(false);

  const [user, setUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(localStorage.getItem("user"));
      setIsLoaded(true);
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
   

    console.log(user)
  },[])
  const promise = loadStripe(
    "pk_test_51MgaqwHbRAiFliiNEQJAtaIOs0gTi4iYfnmBlL6rT2NmkASR0sgNhnHCeUSEPjWPkhzNszWN43An67WnZouA5Ei800QOl0xTth"
  );
 
  return (
    <div className="App">
      {isLoaded ? (
        <div className="loader-container">
       <Loading/>
      </div>
      ):(
      <Suspense fallback={<div></div>}>
        <ToastContainer/>
        <Header />
        <Routes>
          <Route path="*" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          {user == null && <Route path="/Login" element={<Login />}></Route>}
          {user == null && (
            <Route path="/Register" element={<Register />}></Route>
          )}
          {user &&(
          <Route path="/2faenable" element={<EnableTwoFactorAuth/>}></Route>)}
         {user &&( <Route path="/2fadisable" element={<DisableTwoFactorAuth/>}></Route>)}
         {user && JSON.parse(localStorage.getItem('user'))['twoFactorEnabled'] && (
  <Route path="/2faverify" element={<TwoFa />} />
)}         {user &&(<Route path='/profile' element={<Profile />}></Route>)}
         <Route path='/ForgetPwd' element={<ForgetPwd />}></Route>
          {/* <Route path='/resetPwd/:t' element={<ResetPwd />}></Route> */}
          <Route exact path='/resetpassword/:token' element={<ResetPwd />}></Route>
          <Route exact path='/shop' element={<Shop />}></Route>
          <Route exact path='/cart/' element={<Cart />}></Route>
          <Route exact path='/details' element={<Details />}></Route>
          <Route exact path='/checkout' element={<Checkout />}></Route>
          <Route exact path='/payment' element={
              <Elements stripe={promise}>
                <Paymenet />
              </Elements>
            }></Route>
          <Route exact path='/woah' element={<Woah />}></Route>
          <Route exact path='/scrap' element={<Scrap />}></Route>


        </Routes>

        <Footer />
      </Suspense>
      ) 
      }
      
    </div>
  );
}

export default App;
