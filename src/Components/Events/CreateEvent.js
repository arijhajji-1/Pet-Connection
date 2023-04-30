import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { addEvent } from './Services';
import { Container, Form} from 'react-bootstrap';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import {  TextField, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpajEiLCJhIjoiY2xmbXIwZjlpMDA1MDNyb2RvZm5hMTVkZiJ9.wl_CAK8ETNt5oTYJFR0c8A';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
const CreateEvent = ({ onClose, onUpdate }) => {
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [organizerPic, setOrganizerPic] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocalStorage);
  }, []);

  useEffect(() => {
    const mapObj = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 14,
    });
    
   
    const nav = new mapboxgl.NavigationControl();
    mapObj.addControl(nav, 'top-left');
    
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });
    
    mapObj.addControl(geolocateControl);
    mapObj.addControl(geocoder);
    
    setMap(mapObj);
    
    geocoder.on('result', (event) => {
      setLocation(event.result.geometry.coordinates);
      setPlaceName(event.result.place_name);
    
      if (marker) {
        marker.remove();
      }
    
      const newMarker = new mapboxgl.Marker().setLngLat(event.result.geometry.coordinates).addTo(mapObj);
    
      setMarker(newMarker);
    });
    
    geolocateControl.on('geolocate', (event) => {
      handleGeolocation(event.coords.latitude, event.coords.longitude);
    });
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleGeolocation(position);
      },
      (error) => {
        console.error(error);
        mapObj.setCenter([-74.5, 40]);
      }
    );
    }, []);
    
    function handleGeolocation(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    setLocation([longitude, latitude]);
    setPlaceName('Your Location');
    
 
    if (marker) {
      marker.remove();
    }
    
    const newMarker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    setMarker(newMarker);
    map.setCenter([longitude, latitude]);
    }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!location) {
      alert('Please select a location for the event');
      return;
    }
    const userId = JSON.parse(localStorage.getItem("user"));
    let connectedUserId;
    let connectedUserPic;
    if (userId._id) {
      connectedUserId = userId.username;
      connectedUserPic= userId.image;
    } else if (userId.facebookId) {
      connectedUserId = userId.username;
      connectedUserPic= userId.image;
    } else {
     alert("User ID not found.");
      return;
    }

    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('organizer', connectedUserId);
      formData.append('location',  placeName);
      formData.append('image', image);
      formData.append('organizerPic', connectedUserPic);


    await addEvent(formData);
     
      alert('Event created successfully');
      setLocation(null);
      setTitle('');
      setDescription('');
      setDate('');
      setImage(null);
      if (marker) {
        marker.remove();
      }
      setMarker(null);

      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
  
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && ALLOWED_TYPES.includes(selectedFile.type)) {
        setImageUrl(reader.result);
        setImage(selectedFile);
      } else {
        setImage(null);
        setImageUrl("");
        alert("Please upload a valid image file");
      }
    };
    reader.readAsDataURL(selectedFile);
  };
  
  
  
  

  
    return (
      <Container className="form-container">
        <h1 className="form-title">Create Event</h1>
        <Form onSubmit={handleSubmit} id="create-event-form">
          <Form.Group controlId="formImage">
            <Form.Label className="form-label">Event Photo</Form.Label>
            <div className="banner-image-upload">
              <label htmlFor="file">
                {imageUrl ? (
                  <img src={imageUrl} alt="Event Banner" className="banner-image-preview" />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCamera} />
                    <span className="file-label">Choose a photo</span>
                  </>
                )}
              </label>
              <input type="file" id="file" className="form-input" accept=".jpg,.jpeg,.png" onChange={(event) => handleImageChange(event)} style={{ display: "none" }} />
            </div>
          </Form.Group>
    
          <Form.Group controlId="formTitle" className="mb-3">
            <FormControl fullWidth>
              <InputLabel htmlFor="event-name">Enter event name</InputLabel>
              <Input id="event-name" onChange={(event) => setTitle(event.target.value)} />
            </FormControl>
          </Form.Group>
    
          <Form.Group controlId="formDescription" className="mb-3">
            <FormControl fullWidth>
              <InputLabel htmlFor="event-description">Tell people more about your event</InputLabel>
              <Input id="event-description" multiline rows={3} onChange={(event) => setDescription(event.target.value)} />
            </FormControl>
          </Form.Group>
    
          <Form.Group controlId="formDate" className="mb-3">
            <div className="form-icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <FormControl fullWidth>
              <Input id="event-date" type="datetime-local" onChange={(event) => setDate(event.target.value)} />
            </FormControl>
          </Form.Group>
    
          <Form.Group controlId="formLocation" className="mb-3">
            <div className="form-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <Form.Label className="form-label">Location</Form.Label>
            <FormControl fullWidth>
              <InputLabel htmlFor="event-location">Where is your event taking place?</InputLabel>
              <Input id="event-location" value={placeName} onChange={(event) => setPlaceName(event.target.value)} />
            </FormControl>
            <div id="map" style={{ height: "400px" }}></div>
          </Form.Group>
    
          <div className="d-grid gap-2">
            <Button variant="contained" color="primary" type="submit" class="custom-btn btn-2">
             Save
            </Button>
          </div>
    
        </Form>
      </Container>
  
    
  );
};
export default CreateEvent;
