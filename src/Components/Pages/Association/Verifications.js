import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { getUpgrades, addAssociation, deleteUpg } from "../api";
import "../Crowdfunding/crowd.css"; 
 
 

function Verifications() { 
  const [done, setDone] = useState(0);
  const [upgrades, setUpgrades] = useState([]);


  const [up, setUp] = useState({}); 

  const urlUp = "http://localhost:3000/upgrades/";
  const urlAss = "http://localhost:3000/associations/"; 
  
  const getAllUpgrades = () => {
    try {
      axios.get(`http://localhost:3000/user/AllUpgrades`).then((response) => {
        setUpgrades(response.data);
        setUp(response.data[0]);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllUpgrades(); 
  }, []); 

  

  const upgradeUser = () => {
    console.log("USER : " + up.user); 
    var association = {
      upgrade : up._id,
      name: up.name,
      user: up.user,
      latitude: up.latitude,
      longitude: up.longitude,
      bio: up.bio,
      file: up.logo,
      action : 0
    }

    console.log("LOGOOOOOOOOOO : " + up.logo); 
    setDone(1); 
    addAssociation(association); 
    getAllUpgrades(); 
  }

  const deleteUp = () => {
    console.log("UPGRADE : " + up._id); 
    try {
     axios.delete("http://localhost:3000/user/deleteUpgrade/" + up._id);
    } catch (error) {
      console.log(error);
    }

    getAllUpgrades(); 
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
                <h1>Account Upgrades Verifications</h1>
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

      <center>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
            marginTop: "50px",
            marginBottom: "100px",
            background:
              "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
          }}
        >
          <h1
            style={{
              marginTop: "50px",
              color: "black",
              marginBottom: "30px",
            }}
          >
            <i
              className="fa fa-file"
              style={{
                marginRight: "10px",
              }}
            />
            Users Submissions
          </h1>

          <br></br>

          <div
            className="container"
            style={{ padding: "0px 4% 30px 4%", fontWeight: "600" }}
          >
            {/* =============== title ============= */}
            <div className="row">
              {/* =========== tables =================== */}
              <div className="col-6">
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <span className="rankHeads">Name</span>
                    </div>

                    <div className="col-4 rankHeads">Type</div>

                    <div className="col-4 rankHeads">Action</div>
                  </div>

                  {/* ==================== rows ====================== */}
                  {upgrades.map((item, index) => (
                    <>
                      <div
                        className="row rankBar"
                        style={{
                          color: "black",
                          marginBottom: "10px",
                          fontSize: "18px",
                          backgroundColor: "#F3E8F5",
                        }}
                      >
                        <div className="col-4">
                          <span>{item.name}</span>
                        </div>

                        <div className="col-4 username">{item.type}</div>

                        <div className="col-4">
                          <div>
                            <button
                              style={{
                                backgroundColor: "transparent",
                                color: "green",
                              }}
                              onClick={() => {
                                setUp(item);
                                console.log("IMAGE : " + item.logo);
                              }}
                            >
                              <i
                                className="fas fa-edit"
                                style={{ marginRight: "15px" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* ======== edit part =============== */}
              <div className="col-6">
                <img
                  className="img-fluid"
                  src={urlUp + up.file}
                  style={{
                    width: "300px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.15) 0px 2px 2px",
                  }}
                />
                <div className="textSubmissions" style={{ marginTop: "40px" }}>
                  <span>
                    <img
                      src={urlAss + up.logo}
                      style={{
                        width: "50px",
                        marginRight: "10px",

                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.15) 0px 2px 2px",
                      }}
                    />
                    {urlAss + up.logo}
                    {up.name}
                  </span>
                </div>
                <div className="textSubmissions">
                  <div>Bio : {up.bio}</div>
                  <div>Type : {up.type}</div>

                  <div>
                    <a
                      href={`https://www.google.com/maps/@${up.longitude},${up.latitude},16z`}
                      target="_blank"
                    >
                      Find on google Maps
                    </a>
                  </div>
                </div>

                <button
                  style={{
                    padding: "8px 20px 8px 20px",
                    backgroundColor: "orange",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                    marginTop: "30px",
                    marginRight : "10px"
                  }}
                  onClick={upgradeUser}
                >
                  Upgrade User
                </button>

                <button
                  style={{
                    padding: "8px 20px 8px 20px",
                    backgroundColor: "red",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                    marginTop: "30px",
                  }}
                  onClick={deleteUp}
                >
                  Delete Submission
                </button>

                {done == 1 && (
                  <h3 style={{ color: "green", marginTop: "20px" }}>
                    An association has been added.
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

export default Verifications;
