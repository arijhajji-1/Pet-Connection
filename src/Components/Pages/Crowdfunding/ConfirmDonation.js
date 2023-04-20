import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { addDonation } from "../api";

function ConfirmDonation() { 
const [total, setTotal] = useState(0); 
const [color, setColor] = useState("");
const [message, setMessage] = useState("");
const [done, setDone] = useState(0); 
const query = new URLSearchParams(window.location.search);

    useEffect(() => {
       setTotal(query.get("total"));
       setFunding(query.get("funding")); 
    },[])
     
const [funding, setFunding] = useState("");
    const handleSubmit = () => {
      if (query.get("success")) {
        

         
          const donation = {
            user: JSON.parse(localStorage.getItem("user")),
            total: query.get("total"),
            funding: query.get("id"),
          };

          console.log("SENDING FIRSt POST");
          addDonation(donation);
          setDone(1); 
        setMessage(
          "Every contribution is highly valued, and we are committed to ensuring that your donation is utilized in the most effective manner. We appreciate your trust in us and thank you once again for your generous support. "
        );
        setColor("green");
      }

      if (query.get("canceled")) {
        setMessage(
          "Please check the payment information you entered as an error has occurred with your payment method. Make sure that all the details you have provided are correct."
        );
        setColor("red");
      }
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

      {!done && (
        <>
          <center>
            <div
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                padding: "20px",
                borderRadius: "10px",
                width: "80%",
                marginTop: "50px",
                marginBottom: "50px",
                background:
                  "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
              }}
            >
              <h5 style={{marginTop : "20px", color : "black"}}>
                You're about to donate : {total}$ to {funding}
              </h5>

              <br></br>
                          <button style={{
                              width: "200px",
                              padding: "6px",
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: "8px",
                              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              marginBottom : "10px"
                          }}
                          onClick={handleSubmit}
                          >Confirm</button>
            </div>
          </center>
        </>
      )}

      {message && (
        <center>
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              padding: "20px",
              borderRadius: "10px",
              width: "80%",
              marginTop: "50px",
              marginBottom: "50px",
              background:
                "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
            }}
          >
            <h5
              style={{
                marginTop: "40px",
                marginBottom: "50px",
                width: "90%",
                color: color,
              }}
            >
              {message}
            </h5>

            <div
              style={{
                marginBottom: "60px",
                color: "black",
                fontWeight: "700",
                fontSize: "24px",
              }}
            >
              {funding && (
                <>
                  <i className="fa fa-check" style={{ fontSize: 24 }} />
                  &nbsp;{total}$ successfully sent to {funding}.
                  <h5
                    style={{
                      marginTop: "40px",
                      marginBottom: "50px",
                      width: "90%",
                      color: color,
                    }}
                  >
                    Thank you for your donation.
                  </h5>
                </>
              )}
            </div>
          </div>
        </center>
      )}
    </>
  );
}

export default ConfirmDonation;
