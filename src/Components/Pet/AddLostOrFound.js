
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import axios from "axios";
function Addlostorfound() {
    const history = createBrowserHistory();
    const dispatch = useDispatch();

    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState("");
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const [lostPets, setLostPets] = useState([]);
    const [errors, setErrors] = useState({});
  // Event handler for delete button
const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API endpoint
      await axios.delete(`http://127.0.0.1:3000/pet/deletelostbuid/${id}`);
   
      setLostPets(lostPets.filter(pet => pet._id !== id));
  
      // Show a success message using a toast library or any other UI component
      toast.success('Lost pet deleted successfully');
    } catch (error) {
      // Handle error and show an error message
      toast.error('Failed to delete lost pet');
    }
  }
    //get lost and found pets by user
    useEffect(() => {
     
        console.log(user);
        axios.post('http://127.0.0.1:3000/pet/getAllLostAndFounduser', { user })
          .then(response => {
            setLostPets(response.data);
            console.log(lostPets);
            
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      const imageName = lostPets.image;
   
    const handleImageChange = (event) => {

        setImage([
            ...image,
            ...event.target.files
        ]);

    };
    const handleTypeChange = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
    };
    const handlelocationChange = (e) => {
        console.log(e.target.value);
        setLocation(e.target.value);
    };
    const handleSubmit = async (event) => {

        console.log(user)
        event.preventDefault();
         // Form validation ================================

     const errors = {};

     if (description.trim() === "") {
         errors.description = "description is required";
          
     }
     if (location === "") {
        errors.location = "location is required";
         
    }
    if (color.trim() === "") {
        errors.color = "color is required";
         
    }
    if (type === "") {
        errors.type = "type is required";
         
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0){
        const formData = new FormData();
        formData.append("description", description);
        formData.append("location", location);
        formData.append("color", color);
        formData.append("type", type);
        formData.append("user", JSON.stringify(user));
        for (let i = 0; i < image.length; i++) {
            formData.append("image", image[i]);
        }

        toast.success('Lost pet added successfully , please wait ');
        const url = 'http://127.0.0.1:3000/pet/addlost'
        axios.post(url, formData).then(data => {

            // notification 
            // if (user.location === location) {
            //     toast.info(`A lost pet was reported in your area (${location})! If you see anything, please contact the owner.`);
            //   }
            
            history.push('/listlost');
            window.location.reload();
        }).catch(error => {
            console.error(error);
        });
    }
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
                                <h4 className="title-25 mb-20">Add lost or found pet </h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Type of operation</label>
                                                <select id="type" name="type" value={type} onChange={handleTypeChange}>
                                                    <option value="">Select a type</option>
                                                    <option value="lost">Lost</option>
                                                    <option value="found">Found</option>
                                                </select>
                                            </div>
                                            {errors.type && <p style={{ fontSize: 12, color: "red" }}>{errors.type}</p>}

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
                                            {errors.color && <p style={{ fontSize: 12, color: "red" }}>{errors.color}</p>}

                                        </div>
                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Street Address</label>
                                                <select  name="location" value={location} onChange={handlelocationChange}>
                                                    <option value="">Town / City</option>
                                                    <option value="Tunis">Tunis</option>
                                                    <option value="Sfax">Sfax</option>
                                                    <option value="Sousse">Sousse</option>
                                                    <option value="Gabes">Gabes</option>
                                                    <option value="Bizerte">Bizerte</option>
                                                    <option value="Ariana">Ariana</option>
                                                    <option value="Ben Arous">Ben Arous</option>
                                                    <option value="Nabeul">Nabeul</option>
                                                    <option value="Monastir">Monastir</option>
                                                    <option value="Mahdia">Mahdia</option>
                                                    <option value="Kairouan">Kairouan</option>
                                                    <option value="Tozeur">Tozeur</option>
                                                    <option value="Kasserine">Kasserine</option>
                                                    <option value="Gafsa">Gafsa</option>
                                                    <option value="Tataouine">Tataouine</option>
                                                    <option value="Zaghouan">Zaghouan</option>
                                                    <option value="Kebili">Kebili</option>
                                                    <option value="Jendouba">Jendouba</option>
                                                    <option value="Siliana">Siliana</option>
                                                    <option value="Beja">Beja</option>
                                                    <option value="Kef">Kef</option>
                                                    <option value="Sidi Bouzid">Sidi Bouzid</option>
                                                    <option value="Medenine">Medenine</option>
                                                    <option value="Gassrine">Gassrine</option>
                                                    <option value="Manouba">Manouba</option>
                                                </select>

                                            </div>
                                        </div>

                                        {errors.location && <p style={{ fontSize: 12, color: "red" }}>{errors.location}</p>}

                                        <div className="col-12">
                                            <div className="form-inner">
                                                <label>Additional Information</label>
                                                <div className="form-inner">
                                                    <textarea name="description" placeholder="Order Notes (Optional)" rows="6"

                                                        value={description}
                                                        onChange={
                                                            (event) => {

                                                                setDescription(event.target.value);
                                                            }
                                                        }
                                                    ></textarea>
                                                </div>
                                                {errors.description && <p style={{ fontSize: 12, color: "red" }}>{errors.description}</p>}
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
                                Your Posts
                                </h5>
                                <ul className="added-products">
                                {lostPets.map(pet => (    
                                    <li className="single-product d-flex justify-content-start">
                                        <div className="product-img">
                                            <img src={`http://127.0.0.1:3000/pet/image/${pet.image}`} alt="" />
                                        </div>
                                        <div className="product-info">
                                            <h5 className="product-title"><a href="#">{pet.type}</a></h5>
                                            <div className="product-total d-flex align-items-center">
                                               
                                                <strong>
                                                     {/* <i className="bi bi-x-lg px-2"></i> */}
                                                     <span className="product-price">{pet.description}</span><br/>
                                                                       
                                                </strong> 
                                            </div><a
                                                                            href={`/updatepet/${pet._id}`}
                                                                            className="text-secondary font-weight-bold text-xs"
                                                                            data-toggle="tooltip"
                                                                            data-original-title="Edit user"
                                                                            >Edit
                                                                            </a>
                                        </div>
                                        <div className="delete-btn" onClick={() => handleDelete(pet._id)}>
                                            <i className="bi bi-x-lg"></i>
                                        </div>
                                    </li>
                                   ))} 
                                </ul>
                            </div>

                            <ToastContainer />

                        </aside>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Addlostorfound;