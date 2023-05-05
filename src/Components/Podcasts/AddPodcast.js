import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Container, Form, Button } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddPodcast = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [transcription, setTranscription] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recorderControls, setRecorderControls] = useState(null);
  const [loading, setLoading] = useState(false);
  const { transcript, resetTranscript, listening,browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      setTranscription(transcript);
    }
  }, [listening, transcript]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const userId = JSON.parse(localStorage.getItem("user"));
  let connectedUserId;
  if (userId._id) {
    connectedUserId = userId.username;
  } else if (userId.facebookId) {
    connectedUserId = userId.username;
  } else {
   alert("User ID not found.");
    return;
  }
  const addAudioElement = (blob) => {
    setAudioBlob(blob);
    setAudioUrl(URL.createObjectURL(blob));

    // stop listening and reset transcript
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleAudioUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('transcription', transcription);
      formData.append('username',connectedUserId);

      await axios.post('http://localhost:3000/podcast/addpodcast', formData);
      setTitle('');
      setDescription('');
      setTranscription('');
      setAudioBlob(null);
      setAudioUrl(null);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Container>
      <h2>Create a Podcast</h2>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
        </Form.Group>
        {!transcript && <div>Transcribing...</div>}
        {transcript && (
          <Form.Group controlId="transcription">
            <Form.Label>Transcription</Form.Label>
            <Form.Control type="text" value={transcription} readOnly />
          </Form.Group>
        )}
        <Form.Group>
          <AudioRecorder 
            onRecordingComplete={addAudioElement}
            onClick={SpeechRecognition.startListening}
            recorderControls={recorderControls}
          />
          {audioUrl && <audio src={audioUrl} controls />}
        </Form.Group>
        <Button variant="primary" onClick={handleAudioUpload} disabled={!audioUrl}>
          Upload Podcast
        </Button>
      </Form>
    </Container>
  );
};
export default AddPodcast;
