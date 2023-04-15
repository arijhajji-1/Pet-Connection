
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import axios from "axios";
function UpdateLost() {
    const history = createBrowserHistory();
  
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState("");
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const [lostPets, setLostPets] = useState([]);
   
  const { id } = useParams();
    //get lost and found pets by user
    useEffect(() => {
     
        console.log(user);
        axios.post('http://127.0.0.1:3000/pet/getAllLostAndFounduser', { user })
          .then(response => {
            setLostPets(response.data);
            console.log(lostPets);
            // Set form fields with data of the lost post to update
                const lostPost = response.data.find(pet => pet._id === String(id));
                if (lostPost) {
                setColor(lostPost.color);
                setType(lostPost.type);
                setLocation(lostPost.location);
                setDescription(lostPost.description);
                }
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
    // 
   
// Event handler for form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to the API endpoint
      await axios.put(`http://127.0.0.1:3000/pet/updatelost/${id}`, {
        color,
        type,
        location,
        description,
        image
      }).then(data=>{
        toast.success('post updated successfully');
      history.push('/addlost');
      window.location.reload();
      });

      // Show success message or perform other UI updates
      
    } catch (error) {
      // Handle error and show error message
      toast.success('failed to update post');
    }
  }

    return (
        <div>

            <div className="inner-page-banner">
                <div className="breadcrumb-vec-btm">
                    <img className="img-fluid" src="/assets/images/bg/inner-banner-btm-vec.png" alt="" />
                </div>
                <div className="container">
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col-lg-6 align-items-center">
                            <div className="banner-content">
                                <h1>update post</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">update post </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="banner-img d-lg-block d-none">
                                <div className="banner-img-bg">
                                    <img className="img-fluid" src="/assets/images/bg/inner-banner-vec.png" alt="" />
                                </div>
                                <img className="img-fluid" src="/assets/images/bg/inner-banner-img.png" alt="" />
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
                                <h4 className="title-25 mb-20">update post</h4>
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
                                                </div>                                            </div>
                                        </div>


                                    </div>
                                    <div className="place-order-btn">
                                        <button type="submit" className="primary-btn1 lg-btn">Place Order</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <ToastContainer />

                    </div>
                </div>
            </div>

        </div>
    );
}

export default UpdateLost;