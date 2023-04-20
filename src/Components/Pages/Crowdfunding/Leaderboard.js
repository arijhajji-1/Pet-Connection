import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { getRanking } from "../api";

const ProgressBar = ({ progress }) => (
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%` }}></div>
  </div>
);


const styles = {
  rankBar: {},
};

function Leaderboard() {
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const [ranking, setRanking] = useState([]);
  
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    setTotal(query.get("total"));
    setFunding(query.get("funding")); 
    
    axios.get(`http://localhost:3000/donation/getRanking`).then((response) => {
      console.log("user : " + response.data);
      setRanking(response.data); 
    });
    
  }, []);

  const [funding, setFunding] = useState("");
   

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
                <h1>Leaderboard</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Crowdfundings
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
              "linear-gradient(217deg, rgba(44,44,44,1), rgba(44,44,44,0) 90.71%), linear-gradient(127deg, rgba(44,44,44,.8), rgba(44,44,44,0) 90.71%),            linear-gradient(336deg, rgba(44,44,44,.8), rgba(44,44,44,0) 90.71%)",
          }}
        >
          <h1
            className="neonText"
            style={{
              marginTop: "50px",
              //   color: "#D4D4D4",
              marginBottom: "30px",
            }}
          >
            <i
              className="fa fa-trophy"
              style={{
                marginRight: "10px",
              }}
            />
            Leaderboard
          </h1>
          <div
            style={{
              marginBottom: "30px",
              letterSpacing: "5px",
              fontSize: "18px",
              color: "#AFAFAF",
            }}
          >
            Every contribution can save a pet's live.<br></br>
            Kudos to our top donators.
          </div>

          <br></br>

          <div className="container" style={{ padding: "0px 4% 30px 4%" , fontWeight:"600"}}>
            {/* =============== title ============= */}
            <div className="row">
              <div className="col-2">
                <span className="rankHeads"> Rank</span>
              </div>

              <div className="col-6 rankHeads">Username</div>

              <div className="col-2 rankHeads">XP</div>
              <div className="col-2 rankHeads">Level</div>
            </div>

            {/* ==================== rows ====================== */}
            {ranking.map((item, index) => (
              <>
                {index == 0 && (
                  <>
                    <div
                      className="row rankBar"
                      style={{
                        background:
                          "linear-gradient(217deg, rgba(250,181,42,.8), rgba(250,181,42,0) 70.71%), linear-gradient(127deg, rgba(236,198,121,.8), rgba(236,198,121,0) 90.71%),            linear-gradient(336deg, rgba(207,223,217,.8), rgba(207,223,217,0) 70.71%)",
                      }}
                    >
                      <div className="col-2">
                        <span className="rankNumb"> {index + 1} </span>
                      </div>

                      <div className="col-6 username">
                        <i className="fas fa-user-alt" />
                        {" " + item.username}
                      </div>

                      <div className="col-2">
                        <div>{item.xp}</div>
                      </div>
                      <div className="col-2">{item.level}</div>
                    </div>
                  </>
                )}

                {index == 1 && (
                  <>
                    <div
                      className="row rankBar"
                      style={{
                        color: "black",
                        marginBottom: "10px",
                        background:
                          "linear-gradient(217deg, rgba(216,216,216,.8), rgba(216,216,216,0) 70.71%), linear-gradient(127deg, rgba(233,233,233,.8), rgba(233,233,233,0) 90.71%),            linear-gradient(336deg, rgba(135,135,135,.8), rgba(135,135,135,0) 90.71%)",
                      }}
                    >
                      <div className="col-2">
                        <span className="rankNumb">{index + 1}</span>
                      </div>

                      <div className="col-6 username">
                        <i className="fas fa-user-alt" />
                        {" " + item.username}
                      </div>

                      <div className="col-2">
                        <div>{item.xp}</div>
                      </div>

                      <div className="col-2">
                        <div>{item.level}</div>
                      </div>
                    </div>
                  </>
                )}

                {index == 2 && (
                  <>
                    <div
                      className="row rankBar"
                      style={{
                        color: "black",

                        marginBottom: "10px",
                        background:
                          "linear-gradient(217deg, rgba(201,127,90,.8), rgba(201,127,90,0) 90.71%), linear-gradient(127deg, rgba(201,127,90,.8), rgba(172,83,38,0) 90.71%),            linear-gradient(336deg, rgba(201,127,90,.8), rgba(201,127,90,0) 70.71%)",
                      }}
                    >
                      <div className="col-2 ">
                        <span className="rankNumb">{index + 1}</span>
                      </div>

                      <div className="col-6 username">
                        <i className="fas fa-user-alt" />
                        {" " + item.username}
                      </div>

                      <div className="col-2">
                        <div>{item.xp}</div>
                      </div>

                      <div className="col-2">
                        <div>{item.level}</div>
                      </div>
                    </div>
                  </>
                )}

                {index != 0 && index != 1 && index != 2 && (
                  <div
                    className="row rankBar"
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontSize: "18px",
                      backgroundColor: "#F3E8F5",
                    }}
                  >
                    <div className="col-2">
                      <span className="rankNumb">{index + 1}</span>
                    </div>

                    <div className="col-6 username">
                      <i className="fas fa-user-alt" />
                      {" " + item.username}
                    </div>

                    <div className="col-2">
                      <div>{item.xp}</div>
                    </div>

                    <div className="col-2">
                      <div>{item.level}</div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </center>
    </>
  );
}

export default Leaderboard;
