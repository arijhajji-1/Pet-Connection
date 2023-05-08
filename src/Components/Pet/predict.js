import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Predict = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [chatResponse, setChatResponse] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  const handlePredict = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Create a FormData object to send the file data as form data
      const formData = new FormData();
      formData.append('image', selectedImage);
      toast.success('please wait for the response ');
      // Make a POST request to the /predict endpoint with the FormData object
      const response = await axios.post('http://127.0.0.1:3000/pet/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
        }
      });
    
      
      // setChatResponse(response1.data);
      // Handle the response data
      console.log(response.data);
      setPrediction(response.data);
      chatAPI(response.data);
      // Do not access prediction immediately after calling setPrediction
    } catch (error) {
      // Handle any errors
      console.error(error);
      // ... handle error
    }
  }
  
  
  const chatAPI = async (prediction) => {
    try {
      // Make a POST request to the chat API with the predicted breed
      const response = await axios.post('http://127.0.0.1:3000/description', { prompt: prediction });
      // Handle the response data
      console.log(response.data);
      setChatResponse(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
      // ... handle error
    }
  }

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
                <h1>breed prediction</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">breed prediction</li>
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
      <div className="error-page mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-wrapper">
                <div className="error-img">
                
                  {selectedImage && (
                  <img className="img-fluid" src={URL.createObjectURL(selectedImage)} alt="Preview" />
                )}
                </div>
              </div>
              <div className="error-content-area">
                <h2>Upload Image and Get Prediction</h2>
                
                <input type="file" onChange={handleImageChange} />
                
                <div className="error-btn">
                  <form onClick={(e)=>handlePredict(e)}> 
               
                      <button className="btn  primary-btn1"  type="submit"> Predict</button>
                </form>
                {prediction && (
                    <div>
                      <h2>Prediction:</h2>
                      <p>{prediction}</p>
                    </div>
                  )}
                  {chatResponse && (
                    <div>
                      <h2>definition:</h2>
                  <p>{chatResponse}</p>
                </div>
              )}
                </div>
                
                <ToastContainer />

              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Predict;
