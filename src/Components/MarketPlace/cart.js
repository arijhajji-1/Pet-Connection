import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from 'history';
import {toast} from "react-toastify";

function Cart() {
  const userFromLocalStorageString = localStorage.getItem('user');
  const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
  const cart = useSelector(state => state.cart);
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [total,setTotal]=useState(0);
  const [couponcode,setCouponCode]=useState("");
  const [couponValue,setcouponValue]=useState(0);
  const [couponsIsApplied,setCouponsIsApplied]=useState(false);

  async  function  searchForCoupon(){
    if(couponcode==""){
      alert("code non valide");
    }else{
     let  reponse=await axios.get("http://localhost:3000/coupon/isCodeExiste/"+couponcode);
      if(reponse.data.isExiste==true){
        alert("Apply coupon , value : %"+reponse.data.coupon.valeur);
        setcouponValue(reponse.data.coupon.valeur)
        setCouponsIsApplied(true);

      }else{
        alert("code coupon invalid ");

      }


    }
  }
  const { id } = useParams();

  const history = createBrowserHistory();
  async function  Calculatetotal(data){
    let total=0;
    data.forEach(element => {
        total=total+(element.price*element.quantity);
        console.log(total)
    });
    setTotal(total);

  }
  function moveToCheckout(){
    console.log(user);
    let finaltotal=total;

    if(couponsIsApplied){
      finaltotal=total-((total*couponValue)/100)
    }
    localStorage.setItem(
      "facture", finaltotal);

    history.push("/checkout");
    window.location.reload();

  }
   useEffect(() => {
   if(user!=null){
    axios.post('http://localhost:3000/getCartProductsByUser', { user })
      .then(response => {
        console.log(user)
        Calculatetotal(response.data)
        setProducts(response.data);
        console.log(products);
        
      })
      .catch(error => {
        console.error(error);
      });
    }else{
      history.push("/shop");
      window.location.reload();
      }
  }, []);
  //delete product from cart 
  const deleteProductFromCart = async (productId) => {
    try {
      const confirmed = window.confirm("Are you sure your want to delete product from cart?");
      
      if (confirmed) {
       
        const response = await axios.post(`http://localhost:3000/deletecart2/${productId}`, { user });
        console.log(response.data);
        
        history.push('/cart');
        window.location.reload();
        
      }  
     
    } catch (error) {
      console.error(error);
    }
  };
  const addToCart=async (productId)=>{
 
     
      axios.post(`http://localhost:3000/addproducttocart/${productId}`, { user }).then(
       (response)=>{
         axios.post('http://localhost:3000/getCartProductsByUser', { user })
        .then(newCart => {
          Calculatetotal(newCart.data)

     console.log(user)
     setProducts(newCart.data);
     
   })
       }
      ).catch((err)=>{
        console.log(err);

      });
  /*   history.push('/cart');
     window.location.reload();*/
  
  
 
  }
  //subtractFromCart
  const subtractFromCart = async (productId) => {
    //http://localhost:3000/subtractFromCart/${productId}
   
    axios.post(`http://localhost:3000/subtractFromCart/${productId}`, { user }).then(
      (response)=>{
        axios.post('http://localhost:3000/getCartProductsByUser', { user })
       .then(newCart => {
        Calculatetotal(newCart.data)

    console.log(user)
    setProducts(newCart.data);
    
  })
      }
     ).catch((err)=>{
       console.log(err);

     });
  };
//   useEffect(() => {
//     const addproducttocart = async () => {
//           try {
//             const response = await fetch(`http://localhost:3000/product/addproducttocart/${id}`, {
//                     method: 'POST',
//                     body: JSON.stringify({ user: user }),
//                     headers: {
//                       'Content-Type': 'application/json'
//                     }});
//                     const data = await response.json();
//                         console.log(data.message); // Print response message to console
//           } catch (error) {
//                   console.error(error);  

//                 }

//   }
//   addproducttocart();
// })
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
   
    

//     axios.post(`http://localhost:3000/addproducttocart/${id}`, { user })
//     .then(response => {
//       console.log(response.data);
      
//     })
   
//   } catch (error) {
//     console.error(error);
//   }
// };


// useEffect(() => {
//   const addToCart = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3000/addproducttocart/${id}`, { user });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   addToCart();
// }, [response.data]);
  
  return (
    <>
    {user&&
  <>
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
                <h1>Cart</h1>
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

      <div className="cart-section pt-120 pb-120">
        <div className="container">
         
          <div className="row">
            <div className="col-12">
              <div className="table-wrapper">
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Delete</th>
                      <th>Image</th>
                      <th>Food Name</th>
                      <th>Discount Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                  {products && products.map(pet => (    
                    <tr key={pet._id}>
                      <td data-label="Delete">
                        <div className="delete-icon">
                          <i className="bi bi-x" onClick={() => deleteProductFromCart(pet._id)}></i>
                        </div>
                      </td>
                      <td data-label="Image">
                        <img src={pet.img} alt="" />
                      </td>
                      <td data-label="Food Name">
                        <a href="shop-details.html">{pet.name}</a>
                      </td>
                      <td data-label="Unite Price">{pet.price}<br></br><del>50.00 TND</del></td>
                      
                      <td data-label="Discount Price">


                      <button onClick={() => subtractFromCart(pet._id)}>-</button>
                      {pet.quantity} 
                      <button onClick={() => addToCart(pet._id)}>+</button>

                      </td>
                      <td data-label="Quantity">
                        <div className="quantity d-flex align-items-center">
                          <div className="quantity-nav nice-number d-flex align-items-center" >
                          {pet.price * pet.quantity} TND 
                          </div>
                        </div>
                      </td>
                      
                    </tr>
                     ))} 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {!couponsIsApplied&&
            
            <div className="col-lg-4">
              <div className="coupon-area">
                <div className="cart-coupon-input">
                  <h5 className="coupon-title">Coupon Code</h5>
                  <form className="coupon-input d-flex align-items-center">
                    <input type="text" placeholder="Coupon Code" onChange={(e)=>setCouponCode(e.target.value)} />
                    <input type="button" value="Apply Code" className="btn" onClick={searchForCoupon}/>
                  </form>
                </div>
              </div>
            </div>
            }
            {couponsIsApplied&& 
            <div className="col-lg-4">
              <div className="coupon-area">
                <div className="cart-coupon-input">
                  <h5 className="coupon-title">Coupon Code : {couponcode} is Applied Value : {couponValue}</h5>
                 
                </div>
              </div>
            </div>

            }
            <div className="col-lg-8">
<table className="table total-table">
<thead>
<tr>
<th>Cart Totals</th>
<th></th>
<th>{total}</th>
</tr>
</thead>
<tbody>
<tr>
<td>Shipping</td>
<td>
<ul className="cost-list text-start">
<li>Shipping Fee</li>
<li>Total ( tax excl.)</li>
<li>Total ( tax incl.)</li>
<li>Taxes</li>
<li>Shipping Enter your address to view shipping options. <br/> <a href="#">Calculate
shipping</a>
</li>
</ul>
</td>
<td>
<ul className="single-cost text-center">
<li>Fee</li>
<li>Free
</li>
<li>
</li>
<li>Free</li>
<li>Free</li>
<li>Free</li>
</ul>
</td>
</tr>
<tr>
<td>Subtotal</td>
<td></td>
<td>{total}</td>
</tr>
</tbody>
</table>
<ul className="cart-btn-group">
                <li><a href="/shop" className="primary-btn2 btn-lg">Continue to shopping</a></li>
                <li><a onClick={moveToCheckout} className="primary-btn3 btn-lg">Proceed to Checkout</a></li>
            </ul>
</div>
          
          </div>
        </div>
      </div>
      </>
}
    </>
  );
}

export default Cart;