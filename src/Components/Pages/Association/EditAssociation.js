import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { UpgradeUser } from "../api";
import { editAssociation } from "../api";
import axios from "axios";

function EditAssociation() {
    const [association, setAssociation] = useState({}); 
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))["_id"]
    );
    
    const [id, setId] = useState("");
    
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [logo, setLogo] = useState("");

    const [type, setType] = useState("");
    const [done, setDone] = useState(false);


    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [bio, setBio] = useState("");
    const [action, setAction] = useState(0); 
    

    const [file, setFile] = useState(null); 

    


    useEffect(() => {
        console.log(user); 
        axios
          .get(`http://localhost:3000/association/getAssociationByUser/${user}`)
          .then((response) => {
            setAssociation(response.data);
              console.log(response.data);
              setName(response.data.name);
              setBio(response.data.bio); 
              setLatitude(response.data.latitude); 
              setLongitude(response.data.longitude); 
              setId(response.data._id); 
              setAction(response.data.action); 
              setImage(response.data.image) ; 
          })
          .catch((error) => {
            console.log(error);
          });
    },[])

    

  

  const handleFileUpload2 = async (acceptedFiles) => {
    setLogo(acceptedFiles[0]);
  };

  //console.log(file);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); 
      console.log("LOGO : " + logo["path"]);
   
        formData.append("longitude", longitude);
        formData.append("latitude", latitude);
        formData.append("bio", bio);
        formData.append("name", name);
        formData.append("user", user); 
        formData.append("action", action);
    
        if (logo != "") { 
            formData.append("file", logo); 
    }  
    
        console.log(formData); 
      
        editAssociation(id, formData);
    
        setDone(true);
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
  };

  return (
    <>
      <center>
        <div
          className="login-section pt-120 pb-120"
          style={{ marginTop: "-50px", width: "90% !important" }}
        >
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title editButtons" >
                    <h3>
                      <i className="fas fa-edit" style={{ marginRight : "15px" }} />
                      Edit Association
                    </h3>

                    {done && (
                      <h4 style={{ color: "green" }}>
                        {" "}
                        Association edited successfully !
                      </h4>
                    )}
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px"   }}
                            >
                              Association Name{" "}
                            </span>
                          </label>
                          <input
                            type="text"
                            value={name}
                            placeholder="Enter Your Association name..."
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

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
                            value={bio}
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

                      <div className="col-12">
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
                                Drop a new Logo
                                {logo != null && (
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
                    <button className="account-btn">
                      {" "}
                      <i className="fa fa-paw" aria-hidden="true"></i>
                      &nbsp;Edit
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

export default EditAssociation;
