import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom"; 
import axios from "axios";
import { addDonation } from "../api"; 
import "../Crowdfunding/crowd.css"; 
function AssociationList() {
  
  const query = new URLSearchParams(window.location.search);
  const [user, setUser] = useState(""); 
  const [role, setRole] = useState("");
  const [red, setRed] = useState("/login"); 
  const [association, setAssociation] = useState(""); 

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      setUser(JSON.parse(localStorage.getItem("user"))["_id"]);
      setRole(JSON.parse(localStorage.getItem("user"))["role"]);
      setRed("/upgrade");        
      console.log("role : " +JSON.parse(localStorage.getItem("user"))["role"]);
    }
  },[])



  const [data, setData] = useState([]);
  const [fundings, setFundings] = useState([]);
  const [color, setColor] = useState("");
  const [img, setImg] = useState("http://localhost:3000/uploads/");
  const [total, setTotal] = useState(0);
  const [exec, setExec] = useState(query.get("success"));

  const [funding, setFunding] = useState("");

  const baseUrl = "http://localhost:3000/associations/"; 
  
  
  useEffect(() => { 
    axios
      .get("http://localhost:3000/association/allAssociations")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/funding/allFunding")
      .then((response) => {
        setFundings(response.data);
        console.log(fundings);
      })
      .catch((error) => {
        console.log(error);
      });
    
    
  }, []);


  useEffect(() => {
     axios
      .get(`http://localhost:3000/association/getAssociationByUser/${user}`)
      .then((response) => {
        console.log("user : " + response);
        setAssociation(response.data._id);
        console.log("association : " + response.data_id);
      });
  }, [user]); 
  const [message, setMessage] = useState("");
  const location = useLocation();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const id = searchParams.get("id");
  //   console.log(id); // or do something else with the id value
  // }, [location.search]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout

    if (query.get("success")) {
      setTotal(query.get("total"));
      setFunding(query.get("funding"));

      if (exec != 1) {
        const donation = {
          user: JSON.parse(localStorage.getItem("user")),
          total: query.get("total"),
          funding: query.get("id"),
        };

        console.log("SENDING FIRSt POST");
        addDonation(donation);
      }
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
  }, [exec]);


  

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

      {!message && (
        <>
          <h5
            style={{
              marginTop: "70px",
              marginLeft: "8%",
              color: "#353535",
              marginBottom: "-60px",
            }}
          >
            {role != "Association" ? (
              <>
                {role == "admin" ? (
                  <NavLink to={`/verifications`}>
                    <button
                      style={{
                        padding: "8px 20px 8px 20px",
                        backgroundColor: "orange",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                      }}
                    >
                      <i
                        className="fas fa-edit"
                        style={{ marginRight: "15px" }}
                      />
                      Verifications
                    </button>
                  </NavLink>
                ) : (
                  <NavLink to={red}>
                    <button
                      style={{
                        padding: "8px 20px 8px 20px",
                        backgroundColor: "orange",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                      }}
                    >
                      <i
                        className="fas fa-handshake"
                        style={{
                          marginRight: "15px",
                        }}
                      />
                      Become a Partner
                    </button>
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to={`/editAssociation`}>
                  <button
                    style={{
                      padding: "8px 20px 8px 20px",
                      backgroundColor: "orange",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                    }}
                  >
                    <i
                      className="fas fa-edit"
                      style={{ marginRight: "15px" }}
                    />
                    Association
                  </button>
                </NavLink>

                <NavLink to={`/addCrowdfunding`}>
                  <button
                    style={{
                      marginLeft: "20px",
                      padding: "8px 20px 8px 20px",
                      backgroundColor: "#45DC81",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                    }}
                  >
                    <i
                      className="fas fa-handshake"
                      style={{
                        marginRight: "15px",
                      }}
                    />
                    Crowdfunding
                  </button>
                </NavLink>
              </>
            )}

            <NavLink to={`/leaderboard`}>
              <button
                style={{
                  marginLeft: "20px",
                  padding: "8px 20px 8px 20px",
                  backgroundColor: "#DBBAFF",
                  borderRadius: "10px",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                }}
              >
                <i
                  className="fa fa-trophy"
                  style={{
                    marginRight: "15px",
                  }}
                />
                Leaderboard
              </button>
            </NavLink>

            <NavLink to={`/RewardsList`}>
              <button
                style={{
                  marginLeft: "20px",
                  padding: "8px 20px 8px 20px",
                  backgroundColor: "#77A4FF",
                  borderRadius: "10px",
                  zIndex : "100",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                }}
              >
                <i className="fa fa-gift" style={{ marginRight: "15px" }} />
                Rewards
              </button>
            </NavLink>
          </h5>
          {/* <h1>{message}</h1> */}

          <div className="container" style={{ marginBottom: "50px" }}>
            <div className="row">
              <div className="col-6" style={{ marginTop: "120px" }}>
                <div
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    padding: "20px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
                  }}
                >
                  <h3 style={{ paddingLeft: "10px", color: "#353535" }}>
                    CrowdFundings{" "}
                  </h3>

                  {fundings.map((item) => (
                    <>
                      <div
                        style={{
                          marginLeft: "10px",
                          color: "black",
                          fontSize: "18px",
                          marginTop: "40px",
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
                          <span style={{ color: "#2F8702" }}>
                            Total Funds :{" "}
                          </span>
                          {item.total}$ / {item.goal}$
                        </div>
                        <div>
                          {association == item.association && (
                            <NavLink to={`/editCrowdfunding/${item._id}`}>
                              <button
                                style={{
                                  backgroundColor: "#45DC81",
                                  padding: "3px 7px 3px 9px",
                                  borderRadius: "6px",
                                  marginRight: "15px",
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.15) 0px 2px 2px",
                                }}
                              >
                                <i className="fas fa-edit" />
                              </button>
                            </NavLink>
                          )}
                          <NavLink to={`/crowdfunding/${item._id}`}>
                            <button
                              style={{
                                backgroundColor: "orange",
                                padding: "3px",
                                width: "100px",
                                borderRadius: "6px",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.15) 0px 2px 2px",
                              }}
                            >
                              Read More
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="col-6">
                <div className="blog-grid-pages pt-120 mb-120">
                  <div className="container">
                    <div className="row g-lg-4 gy-5 justify-content-center mb-70">
                      {data.map((item) => (
                        <div className="col-lg-6 col-md-6 col-sm-10">
                          <NavLink to={`/association/${item._id}`}>
                            <div className="h1-blog-card">
                              <div className="blog-img">
                                <img
                                  className="img-fluid"
                                  src={baseUrl + item.image}
                                  alt=""
                                />
                                <div className="category">
                                  <a href="blog-grid.html">Association</a>
                                </div>
                              </div>
                              <div className="blog-content">
                                <div className="blog-meta">
                                  <a href="blog-grid.html">{item.role}</a>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: "black",
                                  }}
                                >
                                  <div
                                    href="blog-details.html"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "700",
                                      fontFamily:
                                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                                    }}
                                  >
                                    {item.name}{" "}
                                  </div>
                                  <div className="actions">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {item.action}
                                    </span>{" "}
                                    actions.
                                    {/* <i
                                      className="fas fa-arrow-up"
                                      style={{
                                        fontSize: "18px",
                                        marginRight: "6px",
                                      }}
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AssociationList;
