import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import ReactAudioPlayer from 'react-audio-player';

import {  useParams } from 'react-router-dom';

function DetailsPodcast() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      const response = await axios.get(`http://localhost:3000/podcast/podcast/${id}`);
      const audioResponse = await axios.get(`http://localhost:3000/${response.data.audio}`, { responseType: 'blob' });
      const blob = new Blob([audioResponse.data], { type: 'audio/mp3' });
      setPodcast({ ...response.data, audioBlob: blob });
    };
    fetchPodcast();
  }, [id]);

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="site-blocks-cover inner-page-cover bg-light mb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 text-center">
                <a href="#">{podcast.username}</a>
                <span className="mx-2">•</span> {podcast.createdAt}{" "}
                <h1 className="mb-3">{podcast.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container play-wrap">
        <div className="player mb-5" style={{ display: "flex", justifyContent: "center" }}>
  <ReactAudioPlayer
    src={URL.createObjectURL(podcast.audioBlob)}
    autoPlay={false}
    controls={true} // add the controls attribute
    loop={false}
    volume={1}
    style={{ width: "100%", maxWidth: "800px" }}

  />
</div>

        </div>
      </div>
      <div className="col-md-7 pb-5 mr-auto">
        <p>
          <strong className="font-weight-bold font-weight-bold">Transcript:</strong>
          {podcast.transcription}
        </p>
      </div>
    </>
  );
}

export default DetailsPodcast;
