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

function RewardsList() {
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const query = new URLSearchParams(window.location.search);

    useEffect(() => {
        // setUser(parseInt(JSON.parse(localStorage.getItem("user")).level));
      setRewards([
        {
          name: "Pet Avatar",
          level: "3",
          locked: user.level < 3 ? "gray" : "#F3E8F5",
          link: user.level > 3 ? "/PetAvatar" : "/RewardsList",
        },
        {
          name: "Pet Customization",
          level: "6",
          locked: user.level < 6 ? "gray" : "#F3E8F5",
          link: user.level > 6 ? "/PetAvatar?textToImg=1" : "/RewardsList",
        },
        {
          name: "Pet Emotions",
          level: "9",
          locked: user.level < 9 ? "gray" : "#F3E8F5",
        },
      ]);
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
                <h1>Rewards Center</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Rewards
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
              "linear-gradient(217deg, rgba(205,219,249,1), rgba(205,219,249,0) 90.71%), linear-gradient(127deg, rgba(129,163,230,.8), rgba(129,163,230,0) 90.71%),            linear-gradient(336deg, rgba(77,105,162,.8), rgba(77,105,162,0) 90.71%)",
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
              className="fa fa-gift"
              style={{
                marginRight: "10px",
              }}
            />
            Rewards
          </h1>
          <div
            style={{
              marginBottom: "30px",
              letterSpacing: "3px",
              fontSize: "18px",
              color: "#3A3C3F",
            }}
          >
            Leveling up will grant you the ability to unlock new rewards!
          </div>

          <br></br>

          <div
            className="container"
            style={{ padding: "0px 4% 30px 4%", fontWeight: "600" }}
          >
            {/* =============== title ============= */}
            <div className="row" style={{ width: "80%" }}>
              <div className="col-6 rankHeads">Reward</div>

              <div className="col-2 rankHeads">Level</div>
              <div className="col-2 rankHeads">Locked</div>
            </div>

            {/* ==================== rows ====================== */}
            {rewards.map((item, index) => (
              <>
                <NavLink to={item.link}>
                    
                <div
                  className="row rankBar locked"
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    padding: "20px",
                    fontSize: "18px",
                    backgroundColor: item.locked,
                    width: "80%",
                  }}
                >
                  <div className="col-6 rewards">{" " + item.name}</div>

                  <div className="col-2">
                    <div>{item.level}</div>
                  </div>
                  
                    <div className="col-2">
                      <div>
                        {user.level < item.level ? (
                        <i className="fa fa-lock" />
                        ) : (
                                    <i className="fa fa-unlock" />
                        )}
                      </div>
                    </div>
                  
                </div>
                </NavLink>
              </>
            ))}
          </div>
        </div>
      </center>
    </>
  );
}

export default RewardsList;
