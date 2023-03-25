
import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createBrowserHistory} from 'history';
import {addPetc} from "./SlicePet";
import axios from "axios";
function Addlostorfound() {
    const history = createBrowserHistory();
    const dispatch = useDispatch();

    const [color, setColor] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState([]);
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
   
    const handleImageChange = (event) => {
     
       setImage([
            ...image,
            ...event.target.files
        ]);
       
    };
    const handleSubmit = async (event) => {

        console.log(user)
        event.preventDefault();

        const formData = new FormData();
        // formData.append("description", description);
        formData.append("color", color);
        formData.append("user", JSON.stringify(user));
       for (let i = 0; i < image.length; i++) {
            formData.append("image", image[i]);
        }
       
        const url = 'http://127.0.0.1:3000/pet/addlost'
        axios.post(url, formData).then(data => {
           
           
            history.push('/listlost');
            window.location.reload();
        }).catch(error => {
            console.error(error);
        });
    };
    
    return (
        <div>

            <div className="inner-page-banner">
                <div className="breadcrumb-vec-btm">
                    <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
                </div>
                <div className="container">
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col-lg-6 align-items-center">
                            <div className="banner-content">
                                <h1>Add lost or found pet</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Add lost or found pet </li>
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


            <div className="checkout-section pt-120 pb-120">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-7">
                            <div className="form-wrap box--shadow mb-30">
                                <h4 className="title-25 mb-20">Billing Details</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                    <div className="col-12">
                                            <div className="form-inner">
                                            <label>Type of operation</label>
                                                <div className="nice-select" ><span className="current">Town / City</span>
                                                    <ul className="list">
                                                        <li className="option selected">Lost / Found</li>
                                                        <li className="option">Lost</li>
                                                        <li className="option">Found</li>
                                                      
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Images</label>

                                                <input type="file" name="image" id="file-input"
                                            onChange={handleImageChange}
                                            />
                                        
                                               
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Color </label>
                                                <input type="text" name="color" placeholder="color pet " 
                                                
                                                value={color}
                                                onChange={
                                                    (event) => {
                                                        setColor(event.target.value);
                                                    }
                                                }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Street Address</label>
                                                <div className="nice-select" ><span className="current">Town / City</span>
                                                    <ul className="list">
                                                        <li className="option selected">Town / City</li>
                                                        <li className="option">Dhaka</li>
                                                        <li className="option">Saidpur</li>
                                                        <li className="option">Newyork</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                       
                                      
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Additional Information</label>
                                                <input type="text" name="fname" placeholder="Your Phone Number" />
                                            </div>
                                        </div>
                                       
                                       
                                        <div className="col-12">
                                            <div className="form-inner">
                                                {/* <textarea name="description" placeholder="Order Notes (Optional)" rows="6"
                                                
                                                value={description}
                                                onChange={
                                                    (event) => {
                                                        setDescription(event.target.description);
                                                    }
                                                }
                                                ></textarea> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="place-order-btn">
                                        <button type="submit" className="primary-btn1 lg-btn">Place Order</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <aside className="col-lg-5">
                            <div className="added-product-summary mb-30">
                                <h5 className="title-25 checkout-title">
                                    Order Summary
                                </h5>
                                <ul className="added-products">
                                    <li className="single-product d-flex justify-content-start">
                                        <div className="product-img">
                                            <img src="assets/images/bg/check-out-01.png" alt="" />
                                        </div>
                                        <div className="product-info">
                                            <h5 className="product-title"><a href="#">Whiskas Cat Food Core Tuna</a></h5>
                                            <div className="product-total d-flex align-items-center">
                                                <div className="quantity">
                                                    <div className="quantity d-flex align-items-center">
                                                        <div className="quantity-nav nice-number d-flex align-items-center">
                                                            <input type="number" min="1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <strong> <i className="bi bi-x-lg px-2"></i>
                                                    <span className="product-price">$25.00</span>
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="delete-btn">
                                            <i className="bi bi-x-lg"></i>
                                        </div>
                                    </li>
                                    <li className="single-product d-flex justify-content-start">
                                        <div className="product-img">
                                            <img src="assets/images/bg/check-out-02.png" alt="" />
                                        </div>
                                        <div className="product-info">
                                            <h5 className="product-title"><a href="#">Friskies Kitten Discoveries.</a></h5>
                                            <div className="product-total d-flex align-items-center">
                                                <div className="quantity">
                                                    <div className="quantity d-flex align-items-center">
                                                        <div className="quantity-nav nice-number d-flex align-items-center">
                                                            <input type="number" min="1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <strong> <i className="bi bi-x-lg px-2"></i>
                                                    <span className="product-price">$39.00</span>
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="delete-btn">
                                            <i className="bi bi-x-lg"></i>
                                        </div>
                                    </li>
                                    <li className="single-product d-flex justify-content-start">
                                        <div className="product-img">
                                            <img src="assets/images/bg/check-out-03.png" alt="" />
                                        </div>
                                        <div className="product-info">
                                            <h5 className="product-title"><a href="#">Natural Dog Fresh Food.</a></h5>
                                            <div className="product-total d-flex align-items-center">
                                                <div className="quantity d-flex align-items-center">
                                                    <div className="quantity-nav nice-number d-flex align-items-center">
                                                        <input type="number" min="1" />
                                                    </div>
                                                </div>
                                                <strong> <i className="bi bi-x-lg px-2"></i>
                                                    <span className="product-price">$18.00</span>
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="delete-btn">
                                            <i className="bi bi-x-lg"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            
                            
                        </aside>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Addlostorfound;