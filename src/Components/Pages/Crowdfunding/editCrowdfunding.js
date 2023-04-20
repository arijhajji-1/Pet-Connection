import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { editFunding } from "../api";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditCrowdfunding() {
  const { id } = useParams();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))["_id"]
  );

  const [title, setTitle] = useState("");
  const [association, setAssociation] = useState("");
  const [logo, setLogo] = useState("");
  const [done, setDone] = useState(false);
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState(0);
  const [total, setTotal] = useState(0);

    

  const handleFileUpload2 = async (acceptedFiles) => {
    setLogo(acceptedFiles[0]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/association/getAssociationByUser/${user}`)
      .then((response) => {
        setAssociation(response.data._id);
      });
    
      axios.get(`http://localhost:3000/funding/getOneFunding/${id}`)
          .then((response) => {
              console.log(response.data);
              setTitle(response.data.title); 
              setAssociation(response.data.association); 
              setLogo(response.data.logo); 
              setDesc(response.data.desc); 
              setGoal(response.data.goal); 
              //setTotal(response.data.total); 

      })  ;
    
    
  }, []);
  //console.log(file);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc); 
    formData.append("goal", goal);
    if (logo != "") {
      formData.append("file", logo);
    }
    console.log(formData);
    editFunding(id,formData);
    setDone(true);
  };

  return (
    <>
      <center>
        <div
          className="login-section pt-120 pb-120"
          style={{ marginTop: "-50px" }}
        >
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> Edit Crowdfunding</h3>
                    <p style={{ fontSize: "14px" }}>
                      Edit your crowdfunding action.
                    </p>
                    {done && (
                      <h4 style={{ color: "green" }}>
                        {" "}
                        Your crowdfunding action has been submitted.
                      </h4>
                    )}
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px" }}
                            >
                              Title{" "}
                            </span>
                          </label>
                          <input
                            type="text"
                            value={title}
                            placeholder="Enter a title..."
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px" }}
                            >
                              Description
                            </span>
                          </label>
                          <input
                            type="text"
                            value={desc}
                            placeholder="Enter description..."
                            onChange={(e) => setDesc(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span
                              style={{ fontWeight: "800", marginTop: "30px" }}
                            >
                              Funding Goal ($)
                            </span>
                          </label>
                          <input
                            type="number"
                            value={goal}
                            placeholder="insert a goal"
                            onChange={(e) => setGoal(e.target.value)}
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
                                Drop an image
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

export default EditCrowdfunding;
