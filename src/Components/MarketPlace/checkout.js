import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Checkout() {
  const userFromLocalStorageString = localStorage.getItem('user');
  const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
  const factureFromLocalStorageString = localStorage.getItem('facture');
  
  const [clientSecret, setClientSecret] = useState("");
  const total= factureFromLocalStorageString? JSON.parse(factureFromLocalStorageString) : null;
  

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
                <h1>Check Out</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Check Out
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

      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="form-wrap box--shadow mb-30">
                <h4 className="title-25 mb-20">Billing Details</h4><br></br>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>Username</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="username.."
                          value={user.username}
                          disabled={true}
                        />
                      </div><br></br>
                    </div>
                   
                    <div className="col-12">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your first name"
                          value={user.name}
                        />
                      </div>
                    </div><br></br>
                    <div className="col-12"><br></br>
                      <div className="form-inner">
                        <label>Location</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="House and street name"
                          value={user.location}
                        />
                      </div>
                    </div>
                  
                    <div className="col-12"><br></br>
                      <div className="form-inner">
                        
                        <label>Phone Number:</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your Phone Number"
                          value={user.phone}
                        />
                      </div>
                    </div>
                    <div className="col-12"><br></br>
                      <div className="form-inner">
                      <label>Email Address:</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email Address"
                          value={user.email}
                        />
                      </div>
                    </div>
                 
                   
                  </div>
                </form>
              </div>
              
            </div>
            
            <aside className="col-lg-5">
              
              <div className="added-product-summary mb-30">
                <h5 className="title-25 checkout-title">Other products</h5><br></br>
                <ul className="added-products">
                  <li className="single-product d-flex justify-content-start">
                    <div className="product-img">
                      <img src="assets/images/bg/check-out-01.png" alt="" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">
                        <a href="#">Whiskas Cat Food Core Tuna</a>
                      </h5>
                      <div className="product-total d-flex align-items-center">
                        <div className="quantity">
                          <div className="quantity d-flex align-items-center">
                            <div className="quantity-nav nice-number d-flex align-items-center">
                              <input type="number" value="1" min="1" />
                            </div>
                          </div>
                        </div>
                        <strong>
                          {" "}
                          <i className="bi bi-x-lg px-2"></i>
                          <span className="product-price">$25.00</span>
                        </strong>
                      </div>
                    </div>
                  
                  </li>
                  <li className="single-product d-flex justify-content-start">
                    <div className="product-img">
                      <img src="assets/images/bg/check-out-02.png" alt="" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">
                        <a href="#">Friskies Kitten Discoveries.</a>
                      </h5>
                      <div className="product-total d-flex align-items-center">
                        <div className="quantity">
                          <div className="quantity d-flex align-items-center">
                            <div className="quantity-nav nice-number d-flex align-items-center">
                              <input type="number" value="1" min="1" />
                            </div>
                          </div>
                        </div>
                        <strong>
                          {" "}
                          <i className="bi bi-x-lg px-2"></i>
                          <span className="product-price">$39.00</span>
                        </strong>
                      </div>
                    </div>
                    
                  </li>
                  <li className="single-product d-flex justify-content-start">
                    <div className="product-img">
                      <img src="assets/images/bg/check-out-03.png" alt="" />
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">
                        <a href="#">Natural Dog Fresh Food.</a>
                      </h5>
                      <div className="product-total d-flex align-items-center">
                        <div className="quantity d-flex align-items-center">
                          <div className="quantity-nav nice-number d-flex align-items-center">
                            <input type="number" value="1" min="1" />
                          </div>
                        </div>
                        <strong>
                          {" "}
                          <i className="bi bi-x-lg px-2"></i>
                          <span className="product-price">$18.00</span>
                        </strong>
                      </div>
                    </div>
                    
                  </li>
                </ul>
              </div>
              <div className="summery-card cost-summery mb-30">
                <table className="table cost-summery-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>{total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tax">Tax</td>
                      <td>free</td>
                    </tr>
                    <tr>
                      <td>Total ( tax excl.)</td>
                      <td>free</td>
                    </tr>
                    <tr>
                      <td>Total ( tax incl.)</td>
                      <td>free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="summery-card total-cost mb-30">
                <table className="table cost-summery-table total-cost">
                  <thead>
                    <tr>
                      <th>total</th>
                      <th>{total}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <form className="payment-form">
                <div className="payment-methods mb-50">
                  <div className="form-check payment-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                   <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      Stripe
                    </label>
                    <img src="assets/images/bg/payonert.png" alt="" />
                    
                    
                  </div>
                  
                  <div className="form-check payment-check paypal d-flex flex-wrap align-items-center">
              
                    <a href="#" className="about-paypal">
                      What is PayPal
                    </a>
                  </div>
                 
                </div>
                <div className="place-order-btn">
                  <NavLink to="/payment" className="btn primary-btn1 lg-btn">
                    Place Order
                  </NavLink>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
