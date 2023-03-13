import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import NotFound from './Components/Pages/NotFound';

import { useScript } from 'usehooks-ts'
const Home = React.lazy(() => import('./Components/Pages/Home.js'))
const Header = React.lazy(() => import('./Components/Pages/Header'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Market = React.lazy(()=> import ('./Components/Pages/Market'))
const About = React.lazy(() => import('./Components/Pages/About'))
const Login = React.lazy(() => import('./Components/User/login'))
const Register = React.lazy(()=> import ('./Components/User/register'))
const Profile = React.lazy(()=> import ('./Components/User/profile'))


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
  

  const [user, setUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(localStorage.getItem("user"));
    
    console.log(user)
  },[])


  return (
    <div className="App">
      
     
     
      <Suspense fallback={<div>Loading...</div>}>
      <Header/>
        <Routes>
          <Route path='*' element={<Home/>}></Route>
          <Route path='/shop' element={<Market/>}></Route>
          <Route path='/About' element={<About />}></Route>
          {user == null &&
             
            <Route path='/Login' element={<Login />}></Route>}
          {user ==null &&
            <Route path='/Register' element={<Register />}></Route>
          }
          <Route path='/profile' element={<Profile />}></Route>

        </Routes>
      
        
      <Footer />
      </Suspense>
    </div>
  );
}

export default App;
