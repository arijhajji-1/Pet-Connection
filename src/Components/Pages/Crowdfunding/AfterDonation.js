import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
function AssociationList() {
   const [message, setMessage] = useState("");
   const location = useLocation();

    // useEffect(() => {
    //   const searchParams = new URLSearchParams(location.search);
    //   const id = searchParams.get("id");
    //   console.log(id); // or do something else with the id value
    // }, [location.search]);
    
    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);

      if (query.get("success")) {
        setMessage("Order placed! You will receive an email confirmation.");
      }

      if (query.get("canceled")) {
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);
   
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
                <h1>Associations</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Associations
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

          <h1>{message}</h1>
       </>
  );
}

export default AssociationList;
