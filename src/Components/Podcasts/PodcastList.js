import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import './style.css';
import ReactAudioPlayer from 'react-audio-player';
import useSound from 'use-sound';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import AddPodcast from './AddPodcast';
import Modal from "react-modal";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  useEffect(() => {
    const fetchPodcasts = async () => {
      const response = await axios.get('http://localhost:3000/podcast/podcast');
      const podcasts = await Promise.all(
        response.data.map(async (podcast) => {
          const audioResponse = await axios.get(`http://localhost:3000/${podcast.audio}`, { responseType: 'blob' });
          const blob = new Blob([audioResponse.data], { type: 'audio/mp3' });
          return { ...podcast, audioBlob: blob };
        })
      );
      setPodcasts(podcasts);
    };
    fetchPodcasts();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleDeletePodcast = async (podcastId) => {
    try {
      await axios.delete(`http://localhost:3000/podcast/deletepodcast/${podcastId}`);
      setPodcasts(podcasts.filter((podcast) => podcast._id !== podcastId));
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleOpenMenu = (e, event) => {
    setAnchorEl(e.currentTarget);
    setCurrentEvent(event);
    console.log(e)
    console.log(event)
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentEvent(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };




 


  const podcastList = podcasts.map((podcast) => (
    <div className="d-block d-md-flex podcast-entry bg-white mb-5" key={podcast._id}>
                  <img src={require("./images/img_1.jpg")} alt="Image" className="img-fluid" />


      <div className="text">
        <h3 className="font-weight-light">
       
          <NavLink to={`/DetailsPodcast/${podcast._id}`} >
               
                  
               {podcast.title}
               </NavLink>
        </h3>
        <div className="text-white mb-3">
          <span className="text-black-opacity-05">
            <small>
              By {podcast.username} <span className="sep">/</span> {podcast.createdAt}{" "}
              <span className="sep">/</span>
            </small>
          </span>
        </div>
        <div className="player">
        <ReactAudioPlayer
        
  src={URL.createObjectURL(podcast.audioBlob)}
  autoPlay={false}
  controls={true} // add the controls attribute
  loop={false}
  volume={1}
/>
<DownloadIcon
  type="primary"
  shape="circle"
  size="large"
  onClick={() => {
    const url = URL.createObjectURL(podcast.audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${podcast.title}.mp3`;
    a.click();
  }}
/>

{currentUser && currentUser.username === podcast.username && (
          <DeleteIcon
            type="primary"
            shape="circle"
            size="large"
            onClick={() => handleDeletePodcast(podcast._id)}
          />
        )}

        
      </div>
      </div>
    </div>

  ));
  const updatePodcastList = async () => {
    try {
      const res = await getPodcast();
      setEvents(res.data);
    } catch (err) {

      console.error(err);
    }
  };
  return (
    <>
      <div className="container pt-5 hero">
        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-4">
            <h1 className="mb-3 display-3">Tell Your Story to the World</h1>
            <p>
              Join with us! And listen to espisodes of professionals speaks about pets
            </p>
          </div>
      


          <div className="col-lg-8">
            <img src={require("./images/1x/asset-1.png")} alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="blog-grid-pages pt-120 mb-120">
<div style={{ display: 'flex', justifyContent: 'center' }}>

  <button 
    className="create-event-btn" 
    onClick={handleModalOpen} 
    style={{ 
      marginBottom: '20px',
      backgroundColor: '#F5F5F5',
      color: '#222',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
      transition: 'background-color 0.3s ease-in-out',
      cursor: 'pointer',
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = '#222';
      e.target.style.color = '#F5F5F5';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#F5F5F5';
      e.target.style.color = '#222';
    }}
  >
    Create Podcast
  </button>
  </div>
</div>    
<Modal
  isOpen={isModalOpen}
  onRequestClose={handleModalClose}
  contentLabel="Create podcast Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '70%',
      padding: '40px',
    },
  }}
>
  <button onClick={handleModalClose} className="close-btn">X</button>
  <AddPodcast onClose={handleModalClose} onUpdate={updatePodcastList} />
</Modal>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {podcastList}
            </div>
      {/* <div className="container" >
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="site-block-27">
              <ul>
                <li>
                  <a href="#" className="icon-keyboard_arrow_left" />
                </li>
                <li className="active">
                  <span>1</span>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li>
                  <a href="#" className="icon-keyboard_arrow_right" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </div>
</div>

    {/* <div className="py-5">
      
      <Container>
        <Row>{podcastCards}</Row>
      </Container>
    </div> */}
    
    </>
  );
};

export default PodcastList;