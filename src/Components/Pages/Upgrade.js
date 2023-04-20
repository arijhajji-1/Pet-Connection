import React, { useEffect, useState } from "react"; 
import { toast } from "react-toastify"; 

function Upgrade() {

    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("");
     
    

    function handleSubmit() {
        const verify = { 'role': role, 'image': image, 'type': type };
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

                    <h3>Upgrade Accounts</h3>
                    <p>
                      Are you a veterinarian or an association? Verify your
                      account now.
                    </p>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">

                          <label style={{ float: "left" }}>
                            Association Name (Only if you are submitting for an
                            association){" "}
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Username..."
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>Account Type </label>

                          <select
                            type="text"
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option value={"Veterinarian"}>Veterinarian</option>
                            <option value={"Association"}>Association</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>Document </label>
                          <input
                            type="file"
                            placeholder="Enter Your Username..."
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>

                    </div>
                    <button className="account-btn">
                      {" "}
                      <i className="fa fa-paw" aria-hidden="true"></i>
                      &nbsp;Log in
                    </button>
                  </form>


                  <div className="form-poicy-area">
                    <p>
                      By clicking the "signup" button, you create a Cobiro
                      account, and you agree to Cobiro's{" "}
                      <a href="#">Terms & Conditions</a> &{" "}
                      <a href="#">Privacy Policy.</a>
                    </p>
                  </div>
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
