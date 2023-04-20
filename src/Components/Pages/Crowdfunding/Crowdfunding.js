import { useState, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { getOneAssociation } from "../api";
import { format } from "date-fns";  
import { StripeDonation } from "./StripeDonation"; 
import './crowd.css';
import { Web3 } from "web3"; 
import CryptoDonation from "./CryptoDonation";


const ProgressBar = ({ progress }) => (
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%` }}></div>
  </div>
);


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);




function Crowdfunding() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

    
  const [fundings, setFundings] = useState([]);
  const [donations, setDonations] = useState([]);

  const [progress, setProgress] = useState(0); 
 
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/funding/getOneFunding/${id}`)
      .then((response) => {
        setData(response.data);
        setTotal(response.data.total);
          
        if (((response.data.total / response.data.goal) * 100) > 100) {
          setProgress(100);
        } else {
          setProgress((response.data.total / response.data.goal) * 100);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
    axios
      .get(`http://localhost:3000/donation/getDonationsByFunding/${id}`)
      .then((response) => {
        setDonations(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
    
      
    
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
                <h1>{data.title}</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      CrowdFundings
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

      <div className="container" style={{ marginBottom: "50px" }}>
        <div className="row">
          <div className="col-6" style={{ marginTop: "50px" }}>
            <div
              style={{
                paddingLeft: "30px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                padding: "20px",
                borderRadius: "10px",
                background:
                  "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
              }}
            >
              <h3 style={{ color: "black", fontWeight: "700" }}>
                {data.title}
              </h3>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "19px",
                }}
              >
                Released on {data.date}
              </p>
              <p style={{ color: "#494949" }}>{data.desc}</p>

              <StripeDonation id={data._id} funding={data.title} />
              <CryptoDonation  />
            </div>
          </div>

          <div className="col-6">
            {/* ============== CROWDFUNDINGS PER ASSOCIATION ============== */}
            <div
              style={{
                marginTop: "50px",
                paddingLeft: "30px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                padding: "20px",
                borderRadius: "10px",
                background:
                  "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
              }}
            >
              <center>
                <h1 style={{ margin: "30px", color: "black" }}>
                  {data.total}$ / {data.goal}$
                </h1>
              </center>
              <ProgressBar progress={progress} />
               
              
              
              <h3 style={{ color: "black ", marginTop : "50px" }}>Latest Donations</h3>

              {donations.length == 0 ? (
                <h5 style={{ color: "#494949", marginTop: "20px" }}>
                  {data.title} hasn't receive any donation yet.
                </h5>
              ) : (
                <div
                    className="scrollableDiv"
                >
                  {donations.map((item) => (
                    <>
                      <div
                        style={{
                          marginLeft: "10px",
                          color: "black",
                          fontSize: "18px",
                          marginTop: "30px",
                          fontWeight: "700px !important",
                        }}
                      >
                        <b>{item.title}</b>
                      </div>
                      <div style={{ marginLeft: "10px", color: "black" }}>
                        {item.desc}
                      </div>

                      <div
                        style={{
                          marginLeft: "10px",
                          color: "black",
                          marginBottom: "30px",
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div>
                          <i
                            className="fas fa-money-bill-wave"
                            style={{
                              fontSize: "18px",
                              marginRight: "10px",
                              color: "#2F8702",
                            }}
                          ></i>
                          <span>
                            <span style={{ fontWeight: "700" }}>
                              {item.user.username}{" "}
                            </span>
                            just donated{" "}
                          </span>
                          <span style={{ color: "#2F8702", fontWeight: "700" }}>
                            {item.total}$
                          </span>
                          .
                          <span
                            style={{
                              color: "gray",
                              fontSize: "12px",
                              marginLeft: "20px",
                              fontStyle: "italic",
                            }}
                          >
                            {item.createdAt}
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crowdfunding;
