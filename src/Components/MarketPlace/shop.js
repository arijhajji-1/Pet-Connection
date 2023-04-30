import { useNavigate } from "react-router-dom";
import { NavLink,Link, Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { createBrowserHistory } from 'history';
import {affichage, selectProduct} from "../../redux/slices/ProductSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import {toast} from "react-toastify";

import axios from "axios";
function Shop() {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct);
  const[productsState,setProductState]=useState([]);
  const history = createBrowserHistory();
  const userFromLocalStorageString = localStorage.getItem('user');
  const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
  const [listeFiltre,setListeFiltre]=useState([])
 
  function applyFilter(value){
    console.log(value)
    let lf=listeFiltre;
    if(!lf.includes(value)){
      lf.push(value);

    }else{
      lf.splice(lf.indexOf(value), 1);
    }
    let pr=products;
    if(lf.length>0){
    pr=pr.filter(p=>lf.includes(p.categories));
    setListeFiltre(lf);
   setProductState(pr);
    }else{
      setProductState(products)
    }


  }
  useEffect( () => {
     dispatch(affichage())
  }, [dispatch]);

  useEffect( () =>
   {    
    setProductState(products);
   }
 ,[products] )
  const handleSubmit = async (id) => {

    if(user!=null){
    try {
    
   
      const response =  axios.post(`http://localhost:3000/addproducttocart/${id}`, {user}).then((card)=>{
    
  
      });
      toast.success(" product added to cart", {
        position: "bottom-left",
      })
      console.log(response.data);
   
    } catch (error) {
      console.error(error);
    }}else{
      history.push("/Register")
      window.location.reload();
    }
  };
  return (<>


    <div className="inner-page-banner">

      <div className="breadcrumb-vec-btm">
        <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
      </div>
      <div className="container">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-lg-6 align-items-center">
            <div className="banner-content">
              <h1>Shop</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Shop</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-img d-lg-block d-none">
              <div className="banner-img-bg">
                <img className="img-fluid" src="assets/images/bg/inner-banner-vec.png" alt="" />
              </div>
              <img className="img-fluid" src="assets/images/bg/inner-banner-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="shop-page pt-120 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="shop-sidebar">
              {/* -------------------------Tri------------------------- */}
              <div className="shop-widget">
                <div className="check-box-item">
                  <h5 className="shop-widget-title">Category</h5>
                  <div className="checkbox-container">
                    
                    <label className="containerss">Aliments
                      <input type="checkbox" onClick={(e)=>applyFilter("Aliments")}/>
                      <span className="checkmark" />
                    </label>
                    <label className="containerss">Accessoires
                      <input type="checkbox" onClick={(e)=>applyFilter("Accessoires")} />
                      <span className="checkmark" />
                    </label>
                    <label className="containerss">Jouets
                      <input type="checkbox" onClick={(e)=>applyFilter("Jouets")} />
                      <span className="checkmark" />
                    </label>
                  
                  </div>
                
          
                </div>
                
              </div>
              <li><a href="/cart" className="primary-btn2 btn-lg">My Cart</a></li>

            </div>
          </div>
          {/* ---------------------------------------------------------------------------------- */}

          <div className="col-lg-9">
            <div className="row mb-50">
              <div className="col-lg-12">
                <div className="multiselect-bar">
                  <h6>shop</h6>
                  <div className="multiselect-area">
                    <div className="single-select">
                      <span>Show</span>
                      <select className="defult-select-drowpown" id="color-dropdown">
                        <option selected value={0}>12</option>
                        <option value={1}>15</option>
                        <option value={2}>18</option>
                        <option value={3}>21</option>
                        <option value={4}>25</option>
                      </select>
                    </div>
                    <div className="single-select two">
                      <select className="defult-select-drowpown" id="eyes-dropdown">
                        <option selected value={0}>Default</option>
                        <option value={1}>Grid</option>
                        <option value={2}>Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-4 justify-content-center">

              {productsState&&
              productsState.map((p,i) => {
                return (
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="collection-card">
                      <div className="offer-card">
                        <span>Offer</span>
                      </div>
                      <div className="collection-img">
                        <img className="img-gluid" src={(p !== null) ? p.img : ''} alt="" />
                        <div className="view-dt-btn">
                          <div className="plus-icon">
                            <i className="bi bi-plus" />
                          </div>

                          <NavLink to="/details">View Details</NavLink>
                        </div>

                        <ul className="cart-icon-list">
                          
                          <li>
                            <a onClick={() => handleSubmit(p._id)}>
                              <img src="assets/images/icon/Icon-cart3.svg" alt="" />
                            
                            </a>
                            
                          </li>
                          <li><a href="#"><img src="assets/images/icon/Icon-favorites3.svg" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="collection-content text-center">
                        <h4><NavLink to="/details">{(p !== null) ? p.name : ''}</NavLink></h4>
                        <div className="price">
                          <h6>{(p !== null) ? p.price : ''} <del>$50.00</del></h6>
                        </div>
                        <div className="review">
                          <ul>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
            <div className="row pt-70">
              <div className="col-lg-12 d-flex justify-content-center">
                <div className="paginations-area">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-left-short" /></a></li>
                      <li className="page-item active"><a className="page-link" href="#">01</a></li>
                      <li className="page-item"><a className="page-link" href="#">02</a></li>
                      <li className="page-item"><a className="page-link" href="#">03</a></li>
                      <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-right-short" /></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>  );
}

export default Shop;
