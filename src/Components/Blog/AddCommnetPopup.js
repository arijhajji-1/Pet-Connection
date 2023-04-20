
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


import './detailsPublication.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ReactModal from 'react-modal';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';



// animation

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

import useSound from 'use-sound';
import startSound from './start.mp3';
import endSound from './end.mp3';


// 



function AddCommnetPopup({ isOpen, onClose, onSubmit }) {


  const [text, setTextComment] = useState('');

  const [error, setError] = useState('');



// 

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';

const [isListening, setIsListening] = useState(false);


//sound options
const [playStartSound] = useSound(startSound);
const [playEndSound] = useSound(endSound);



// 



recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  setTextComment(transcript);
};








const handleStart = () => {
  recognition.start();
  setIsListening(true);
  playStartSound();



}






recognition.onend = () => {
  setIsListening(false);
  playEndSound();



};

const handleStop = () => {
  recognition.stop();
}


const handleTextChange = (value) => {
  setTextComment(value);
  // setHeight(value.split('\n').length * 20);
}



// 




  const handleSubmit = (event) => {
    event.preventDefault();

  

    if (text == '') {
      setError('Veuillez remplir tous les champs');
      return;
    }

    fetch(`https://www.purgomalum.com/service/containsprofanity?text=${text}`)
    .then(response => response.text())
    .then(result => {
        if (result === 'true') {
            // Mots grossiers détectés
            // setContainsProfanity(true);
            // notifybedwoed('bed words was detected in description!')
            warningNotification()
        } else {
            // setContainsProfanity(false);

            onSubmit({ text });

        }
    });











  };





    const notifybedwoed = (xx) => toast.error(xx, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    function warningNotification() {
        addNotification({
            title: 'bad words',
            //   subtitle: 'Please fill it',
            message: 'there is bad words please remove it', theme: 'red',
            closeButton: "X",
            duration: 2000,
        })
    };





  const lineHeight = 20; // La hauteur d'une ligne en pixels
  const height = lineHeight * 5;

  return (


   

    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      // contentLabel="Ajouter un commentaire"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '600px',
          minHeight: '350px',


          margin: '0 auto',
        },
      }}
    >
    <ToastContainer />
    <Notifications />


      <div className="comment-popup" >

        


        <div className="row">
          <div className="col-md-8">
            {/* <h2 style={{marginButtom:'35px'}}>Ajouter un commentaire</h2> */}
            <h2 style={{ marginBottom: '20px' }}>Add Comment</h2>


          </div>
          
          <div className="col-md-2 offset-md-2" style={{ paddingLeft: "63px", paddingTop: "3px" }}>
            <button className="comment-popup-close" onClick={onClose}>
              <i style={{ color: "red" }} className="fa fa-times"></i>

            </button>


          </div>
        </div>

     

        <button  onClick={handleStart}type="button" class="btn btn-success">
        {/* <i class="fa fa-microphone"></i> */}
        <FontAwesomeIcon icon={faMicrophone} className={`mic-icon ${isListening ? 'animate' : ''}`} />
        </button>

        {/* {isListening && <div className="animation">Votre animation ici</div>} */}

        {/* <button>
        <FontAwesomeIcon icon={faMicrophone} className={`mic-icon ${isListening ? 'animate' : ''}`} />
        </button> */}

   



       {/* <button onClick={handleStop}>Arrêter la reconnaissance vocale</button> */}

        <form onSubmit={handleSubmit} >



           
      <br />
      <ReactQuill theme="snow" value={text} onChange={handleTextChange} style={{ height: `${height}px` }} />




            <div style={{ marginTop: "60px" }}>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit" className="primary-btn1" style={{ padding: "0px 10px" }}> Add comment</button>

              <button onClick={onClose} className="reset-btn1" >reset</button>

            </div>



        </form>
      </div>



    </ReactModal>
  );
}


export default AddCommnetPopup;
