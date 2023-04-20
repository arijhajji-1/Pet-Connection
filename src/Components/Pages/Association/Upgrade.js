import React, { useEffect, useState } from "react"; 
import Dropzone from "react-dropzone";
import { UpgradeUser } from "../api";
import { toast } from "react-toastify"; 



function Upgrade() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))["_id"]); 
  
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [logo, setLogo] = useState("");
  
    const [type, setType] = useState("");
    const [done, setDone] = useState(false);
  
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [bio, setBio] = useState("");
  

  
  
    console.log(user);  
    // console.log("type : " + type);   
    // console.log("Name : " + name);  
    // console.log("Latitude : " + latitude);   
    // console.log("Longitude : " + longitude);   
  

    const [file, setFile] = useState(null);
    const handleFileUpload = async (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    };
  
    const handleFileUpload2 = async (acceptedFiles) => {
      setLogo(acceptedFiles[0]);
    };


   //console.log(file);
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("logo", logo);
      formData.append("type", type);
      formData.append("user", user);
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
      formData.append("bio", bio);



      if (type != "Association") {
        formData.append("name", "none"); 
      } else {
        formData.append("name", name)
      }
      console.log(formData); 
      UpgradeUser(formData);
      setDone(true); 
      toast.success("Thank you for your submit. It may take a few hours to upgrade your account.");
    };
    
  
  const getLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
       
    }
       
  }

  return (
    <>
      <center>
        <div className="login-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Upgrade Account</h3>
                    <p style={{ fontSize: "14px" }}>
                      Are you a veterinarian or an association? Verify your
                      account now.
                    </p>
                    {done && (
                      <h4 style={{ color: "green" }}>
                        {" "}
                        Thank you for your submit. It may take a few hours to
                        upgrade your account.
                      </h4>
                    )}
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left", fontWeight: "800" }}>
                            Type{" "}
                          </label>
                          <div style={{ display: "flex" }}>
                            <input
                              style={{
                                transform: "scale(0.5)",
                                marginTop: "-10px",
                              }}
                              type="radio"
                              id="Veterinarian"
                              name="type"
                              value="Veterinarian"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="html"
                              style={{
                                marginLeft: "-40px",
                                marginRight: "10px",
                              }}
                            >
                              Veterinarian
                            </label>
                            <input
                              style={{
                                transform: "scale(0.5)",
                                marginTop: "-10px",
                              }}
                              type="radio"
                              id="Association"
                              name="type"
                              value="Association"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="css"
                              style={{
                                marginLeft: "-40px",
                                marginRight: "10px",
                              }}
                            >
                              Association
                            </label>
                          </div>
                        </div>
                      </div>

                      {type == "Association" && (
                        <div className="col-12">
                          <div className="form-inner">
                            <label style={{ float: "left" }}>
                              <span
                                style={{ fontWeight: "800", marginTop: "30px" }}
                              >
                                Association Name{" "}
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Your Association name..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px" }}
                            >
                              Bio
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter description..."
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          onClick={getLocation}
                          style={{
                            padding: "10px",
                            float: "left",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            border: "1px solid black",
                            marginBottom: "20px",
                          }}
                        >
                          <i
                            class="fa fa-map-marker"
                            style={{
                              fontSize: "20px",
                              marginRight: "10px",
                            }}
                          ></i>
                          Locate Me
                        </button>
                      </div>

                      <div className="col-6">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px" }}
                            >
                              Longitude
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Association name..."
                            onChange={(e) => setLongitude(e.target.value)}
                            value={longitude}
                            disabled="true"
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px" }}
                            >
                              Latitude
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Association name..."
                            onChange={(e) => setLatitude(e.target.value)}
                            value={latitude}
                            disabled="true"
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <Dropzone onDrop={handleFileUpload}>
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps()}
                              style={{
                                color: "black !important",
                                height: "60px",
                                paddingTop: "5px",
                                marginTop: "20px",
                                marginBottom: "30px",
                                boxShadow:
                                  "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                border: "1px solid black",
                                background:
                                  "linear-gradient(217deg, rgba(255,130,130,.8), rgba(255,130,130,0) 70.71%),            linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
                              }}
                            >
                              <input {...getInputProps()} />
                              <p
                                style={{
                                  color: "black",
                                  fontSize: "17px",
                                }}
                              >
                                <i
                                  className="fa fa-upload"
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "10px",
                                  }}
                                ></i>
                                Drop a verification file
                                {file != null && (
                                  <p
                                    style={{
                                      color: "darkGreen",
                                    }}
                                  >
                                    {" "}
                                    {file["path"]}{" "}
                                  </p>
                                )}
                              </p>
                            </div>
                          )}
                        </Dropzone>
                      </div>

                      <div className="col-6">
                        <Dropzone onDrop={handleFileUpload2}>
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps()}
                              style={{
                                color: "black !important",
                                height: "60px",
                                paddingTop: "5px",
                                marginTop: "20px",
                                marginBottom: "30px",
                                boxShadow:
                                  "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                border: "1px solid black",
                                background:
                                  "linear-gradient(217deg, rgba(255,130,130,.8), rgba(255,130,130,0) 70.71%),            linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
                              }}
                            >
                              <input {...getInputProps()} />
                              <p
                                style={{
                                  color: "black",
                                  fontSize: "17px",
                                }}
                              >
                                <i
                                  className="fa fa-upload"
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "10px",
                                  }}
                                ></i>
                                Drop a Logo
                                {file != null && (
                                  <p
                                    style={{
                                      color: "darkGreen",
                                    }}
                                  >
                                    {" "}
                                    {logo["path"]}{" "}
                                  </p>
                                )}
                              </p>
                            </div>
                          )}
                        </Dropzone>
                      </div>



                    </div>
                    <button className="account-btn" disabled={!file}>
                      {" "}
                      <i className="fa fa-paw" aria-hidden="true"></i>
                      &nbsp;Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

export default Upgrade;
