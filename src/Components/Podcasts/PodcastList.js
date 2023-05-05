import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import './style.css';
import ReactAudioPlayer from 'react-audio-player';
import useSound from 'use-sound';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';


const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);

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
  const forceUpdate = () => {
    setPodcasts([...podcasts]);
  };
  const handleDeletePodcast = async (podcastId) => {
    try {
      await axios.delete(`http://localhost:3000/podcast/deletepodcast/${podcastId}`);
      const updatedPodcasts = podcasts.filter((podcast) => podcast._id !== podcastId);
      setPodcasts(updatedPodcasts);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };





 


  const podcastList = podcasts.map((podcast) => (
    <div className="d-block d-md-flex podcast-entry bg-white mb-5" key={podcast._id}>
                  <img src={require("./images/img_1.jpg")} alt="Image" className="img-fluid" />


      <div className="text">
        <h3 className="font-weight-light">
          <a href={`single-post/${podcast._id}`}>
            {podcast.title}
          </a>
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

  return (
    <>
      <div className="container pt-5 hero">
        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-4">
            <h1 className="mb-3 display-3">Tell Your Story to the World</h1>
            <p>
              Join with us! Login or Register. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Delectus, ex!
            </p>
          </div>
          <div className="col-lg-8">
            <img src={require("./images/1x/asset-1.png")} alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {podcastList}
            </div>
      <div className="container" >
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
      </div>
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