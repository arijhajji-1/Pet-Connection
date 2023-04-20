import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { getOneAssociation } from "../api";
import { format } from "date-fns";
function AssociationList() {
    const { id } = useParams(); 
    const [data, setData] = useState({});
  const [fundings, setFundings] = useState([]);

  const [img, setImg] = useState("http://localhost:3000/uploads/");

  const baseUrl = "http://localhost:3000/associations/";
    const formattedDate = ""; 

  useEffect(() => {
     
    axios
      .get(
        `http://localhost:3000/association/getOneAssociation/${id}`
      )
      .then((response) => {
          setData(response.data); 

      })
      .catch((error) => {
        console.log(error);
      });
 
    axios
      .get(`http://localhost:3000/funding/getFundingByAssociation/${id}`)
      .then((response) => {
        setFundings(response.data);
        console.log(fundings);
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
                <h1>{data.name}</h1>
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
              <h3 style={{ color: "black", fontWeight: "700" }}>{data.name}</h3>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "19px",
                }}
              >
                Released on {data.date}
              </p>
              <p style={{ color: "#494949" }}>{data.bio}</p>

              <center>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d82077.28159616987!2d${data.longitude}!3d${data.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2stn!4v1679836721177!5m2!1sfr!2stn`}
                  width={"90%"}
                  height={450}
                  style={{ border: "2px solid gray", marginTop: "30px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </center>
            </div>
          </div>

          <div className="col-6">
            {/* =========== IMAGE ================= */}
            <img
              style={{
                marginTop: "50px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                borderRadius: "10px",
                display: "block",
                maxWidth: "100%",
                height: "auto",
              }}
              src={baseUrl + data.image}
            />

            {/* ============== CROWDFUNDINGS PER ASSOCIATION ============== */}
            <div
              style={{
                marginTop: "25px",
                paddingLeft: "30px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                padding: "20px",
                borderRadius: "10px",
                background:
                  "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
              }}
            >
              <h3 style={{ color: "black " }}>Latest Actions</h3>

              {fundings.length == 0 && (
                <h5 style={{ color: "#494949", marginTop: "20px" }}>
                  {data.name} hasn't received any donations yet.
                </h5>
              )}
              {fundings.map((item) => (
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
                      <span style={{ color: "#2F8702" }}>Total Funds : </span>
                      {item.total}${" "}
                    </div>
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
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssociationList;
