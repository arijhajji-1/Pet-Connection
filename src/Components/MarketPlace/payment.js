import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { createBrowserHistory } from 'history';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
const history = createBrowserHistory();

function Payment() {

    const userFromLocalStorageString = localStorage.getItem('user');
    const factureFromLocalStorageString = localStorage.getItem('facture');
    
    const [clientSecret, setClientSecret] = useState("");
    const total= factureFromLocalStorageString? JSON.parse(factureFromLocalStorageString) : null;
    

    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
     async function  remplirProducts(){
         reuslt=await axios.post('http://localhost:3000/getCartProductsByUser', { user });
        
            Calculatetotal(reuslt.response.data)
            setProducts(reuslt.response.data);
            
          
    }
    async function fetchClientSecret (){
        if(user!=null){
         
              axios.post("http://localhost:3000/payment/create", {
                prix: total*100,
              }).then((data)=>{
              console.log(data.data.clientSecret);
       
              setClientSecret(data.data.clientSecret);
            }).catch(error => {
                console.error(error);
              });
     

      
     }else{
        history.push("/shop");
        window.location.reload();
     }
    }
   
    useEffect( () => {
        fetchClientSecret();
    }, []);
  
    const confirmPayment = async (e) => {
        e.preventDefault();

      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then( (result) =>  {
            console.log(result)
            axios.delete("http://localhost:3000/deleteCart/"+user._id).then(()=>{
                history.push("/cart");
                window.location.reload();
            });
        
          }).catch((err) => console.log(err));
    };
  
    return (<>
    
        <div className="inner-page-banner">
        <div className="breadcrumb-vec-btm">
          <img
            className="img-fluid"
            src="/assets/images/bg/inner-banner-btm-vec.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-6 align-items-center">
              <div className="banner-content">
                <h1>Payment</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
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
                    src="/assets/images/bg/inner-banner-vec.png"
                    alt=""
                  />
                </div>
                <img
                  className="img-fluid"
                  src="/assets/images/bg/inner-banner-img.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-title1 text-center"><br></br>
  <img src="assets/images/icon/section-vec-l1.svg" alt="" />
  Welcome
  <img src="assets/images/icon/section-vec-r1.svg" alt="" />
  <h2>pay with stripe  :</h2>
</div>


     <PaymentContainer>
              <h5>Payment Method : Stripe </h5>
                <h2>total : {total} </h2>
              <div>
                <p>Card Details</p>
  
                {/* Card Element */}
  
                <CardElement />
              </div>
            </PaymentContainer>
            <button className="btn btn-primary" onClick={confirmPayment}>Valider</button>
            </>
  
    );
  }

  
const PaymentContainer = styled.div`
  margin-top: 15px;
  div {
    margin-top: 15px;
    margin-left: 15px;
    p {
      font-size: 14px;
    }
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  padding: 15px;
  display: flex;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ReviewContainer = styled.div`
  background-color: #fff;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const AddressContainer = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;
    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }
`;



const OrderContainer = styled.div`
  margin-top: 30px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;
  h4 {
    font-weight: 600;
    font-size: 18px;
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }
  small {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      margin-left: 10px;
    }
  }
  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    border-radius: 8px;
  }
`;


  
  export default Payment;