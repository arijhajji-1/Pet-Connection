import React, { useState } from 'react';
import axios from 'axios';

const Predict = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  const handlePredict = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Create a FormData object to send the file data as form data
      const formData = new FormData();
      formData.append('image', selectedImage);
  
      // Make a POST request to the /predict endpoint with the FormData object
      const response = await axios.post('http://127.0.0.1:3000/pet/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
        }
      });
  
      // Handle the response data
      console.log(response.data);
      setPrediction(response.data);
      // Do not access prediction immediately after calling setPrediction
    } catch (error) {
      // Handle any errors
      console.error(error);
      // ... handle error
    }
  }
  
  

  return (
    <div>
      <h1>Upload Image and Get Prediction</h1>
      <input type="file" onChange={handleImageChange} />
      <form onClick={handlePredict}> 
           
            <button type="submit">Predict</button>
      </form>
     
      {prediction && (
        <div>
          <h2>Prediction:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default Predict;
