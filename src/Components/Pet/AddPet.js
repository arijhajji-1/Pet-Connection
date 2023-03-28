import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createBrowserHistory} from 'history';
 
import axios from "axios";

 
function AddPet() {
    // useEffect(() => {
    //     console.log(JSON.parse(localStorage.getItem("user"))["_id"]);
    // },[])
    const history = createBrowserHistory();
    const dispatch = useDispatch();

    const [color, setColor] = useState("");
    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [image, setImage] = useState([]);
    

    

    const handleImageChange = (event) => {
        const files = event.target.files;
        const urls = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                urls.push(reader.result);
                if (urls.length === files.length) {
                  setImage(urls);
                }
            };
        }

        document.getElementById('chose').setAttribute('hidden', true);
        setImages([
            ...images,
            ...event.target.files
        ]);
       
    };

    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
 
    
    const handleSubmit = async (event) => {

        console.log(user)
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("color", color);
        formData.append("user", JSON.stringify(user));

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const url = 'http://127.0.0.1:3000/pet/addpetwithUser'
        axios.post(url, formData).then(data => {
           
           
            history.push('/profile');
            window.location.reload();
        }).catch(error => {
            console.error(error);
        });
    };
    return (
        <div>
            <div className="services-details-area pt-120 mb-120">
                <div className="container">
                    <div className="row g-lg-4 gy-5 mb-120">
                        <div className="col-lg-7">
                            <div className="tab-content tab-content1" id="v-pills-tabContent">
                              
                                <img src="/assets/images/add-image4.png" id="chose" className="responsiveImg"/>
                              
                                
                                {image.map((img, index) => (
                                  <div className={`tab-pane fade ${index === 0 ? 'active show' : ''}`} id={`v-pills-img${index + 1}`} role="tabpanel" aria-labelledby={`v-pills-img${index + 1}-tab`}>
                                   <img className="img-fluid bigCardPet" src={img} alt=""/>
                                  </div>
                                  ))} 
                            </div>
                            <div className="nav nav1 nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {image.map((img, index) => (
                                  <button className={`nav-link ${index === 0 ? 'active' : ''}`} id={`v-pills-img${index + 1 }-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-img${index + 1}`} type="button" role="tab" aria-controls={`v-pills-img${index + 1}`} aria-selected={index === 0}>
                                    <img key={index} src={img} alt=""  className="smallCardPet" />
                                  </button>
                                ))}     
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="services-datails-content">
                                <div className="banner-title">
                                    <h2>Add Pet</h2>
                                    <div className="currency">
                                        <h5>Pet</h5>
                                    </div>
                                </div>

                                <div className="service-area">
                                    <form onSubmit={handleSubmit}>

                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="form-inner">
                                                    <label>Type</label>
                                                    <select id="duration">
                                                        <option>Choose an option</option>
                                                        <option>Cat</option>
                                                        <option>Dog</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div class="form-inner">
                                                    <label>Name</label>
                                                    <input type="text" placeholder="Enter Name"
                                                        value={name}
                                                        onChange={
                                                            (event) => {
                                                                setName(event.target.value);
                                                            }
                                                        }/>
                                                </div>
                                            <div class="form-inner">
                                                <label>Color
                                                </label>
                                                <input type="text" placeholder="Enter color"
                                                    value={color}
                                                    onChange={
                                                        (event) => {
                                                            setColor(event.target.value);
                                                        }
                                                    }/>
                                            </div>
                                            <div class="form-inner">
                                        <label>Images:</label>

                                        <input type="file" name="images" id="file-input"
                                            onChange={handleImageChange}
                                            multiple/>
                                        </div>

                                    </div>
                                    <div className="shop-quantity d-flex flex-wrap align-items-center justify-content-start mb-20">
                                        <div className="quantity d-flex align-items-center">
                                            <div className="quantity-nav nice-number d-flex align-items-center"></div>
                                        </div>
                                        <button type="submit" className="primary-btn3">Add Pet</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

</div>
    );
}

export default AddPet;
