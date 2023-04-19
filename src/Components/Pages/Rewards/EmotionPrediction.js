import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from "react-dropzone";
import "./emotion.css";

function EmotionPrediction() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:3000/event/predict_emotion', formData);
      setPredictedEmotion(response.data.predictedEmotion);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="container2">
      <h1 className="title">Emotion Prediction</h1>
      <form onSubmit={handleSubmit} className="form">
        <Dropzone onDrop={(acceptedFiles) => setSelectedImage(acceptedFiles[0])}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {selectedImage ? (
                  <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="preview" />
                ) : (
                  <div className="dropzone-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag and drop an image file here or click to select one</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </Dropzone>
        <button type="submit" className="button">Predict Emotion</button>
      </form>
      {predictedEmotion && (
        <div className="result">
                    <div className="result-wrapper">

          <h2 className="result-title">Your dog is:</h2>
          <p className="result-message">{predictedEmotion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmotionPrediction;