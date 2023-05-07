import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Container, Form, Button } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddPodcast = ({ onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [transcription, setTranscription] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);


  const [recorderControls, setRecorderControls] = useState(null);
  const [loading, setLoading] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [savedTranscript, setSavedTranscript] = useState('');

  useEffect(() => {
    if (!transcript && !recorderControls?.isRecording) {
      SpeechRecognition.stopListening();
      setLoading(true);
      SpeechRecognition.startListening({ continuous: true, lang: 'en-US' });
    } else if (transcript) {
      setTranscription((prevTranscription) => prevTranscription + transcript + ' ');
      setSavedTranscript((prevSavedTranscript) => prevSavedTranscript + transcript + ' ');
      resetTranscript();
    }
  }, [transcript, recorderControls, resetTranscript]);

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
    setLoading(false);
  };

  const handleAudioUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('transcription', savedTranscript);
      formData.append('username', connectedUserId);

      await axios.post('http://localhost:3000/podcast/addpodcast', formData);
      setTitle('');
      setDescription('');
      setSavedTranscript('');
      setAudioBlob(null);
      setAudioUrl(null);
      onUpdate();
      onClose();
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
        {loading && <div>Transcribing...</div>}
        {!loading && (
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
