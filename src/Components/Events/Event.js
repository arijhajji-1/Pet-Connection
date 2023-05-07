import { NavLink ,Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getEvents,deleteEvent } from "./Services";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from "date-fns";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import {

  Menu,
  MenuItem,
} from '@material-ui/core';
import Modal from "react-modal";
import CreateEvent from "./CreateEvent";
import "./style.css";
function EventList() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data);
        console.log(res.organizerPic)

      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);
  const updateEventsList = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {

      console.error(err);
    }
  };
  
  let connectedUserId;
  if (user._id) {
    connectedUserId = user.username;
  } else if (user.facebookId) {
    connectedUserId = user.username;
  } else {
   alert("User ID not found.");
    return;
  }
  
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
  const baseUrl = "http://localhost:3000/uploads/"; // Replace with your base URL

  const handleDelete = async (id) => {
    console.log(id); // add this line to check the value of id
  
    try {
      await deleteEvent(id, connectedUserId);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  

  

  return (
    <div>
 <FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  }}
  events={events.map((event) => ({
    title: event.title,
    start: event.date,
  }))}
  height="500px"
  className="my-calendar"
/>


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
    Create Event
  </button>
  </div>
</div>







<Modal
  isOpen={isModalOpen}
  onRequestClose={handleModalClose}
  contentLabel="Create Event Modal"
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
  <CreateEvent onClose={handleModalClose} onUpdate={updateEventsList} />
</Modal>


   

  <div className="container">
    <div className="row">
      {events.map((event) => (
        
        <div className="col-lg-4 mb-4" key={event._id}>
          <Card sx={{ maxWidth: 345 }}>
          <CardHeader
        avatar={
<Avatar
  aria-label="avatar"
  image={`${baseUrl}${event.organizerPic}`}
  title={event.organizer}
/>

        }
        action={
          <div>
           {user && event.organizer === user.username && (
 <IconButton aria-label="settings" onClick={(e) => handleOpenMenu(e, event._id)}>
 <MoreVertIcon />
</IconButton>

)}

           <Menu
             id="simple-menu"

        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
              {user && event.organizer === user.username && (
                <MenuItem onClick={() => {
                  console.log(currentEvent);
                  handleDelete(currentEvent);
                }}
                >Delete</MenuItem>
              )}
              {user && event.organizer === user.username && (
                <MenuItem component={Link} to={`/UpdateEvent/${currentEvent}`}>
                  Modify
                </MenuItem>
              )}
            </Menu>
          </div>
        

        }
        title={event.organizer}
        subheader={format(new Date(event.createdAt), "dd/MM/yyyy,HH:MM")}
      />
          <div className="blog-img">
            <CardMedia
            className="img-fluid"
              sx={{ height: 194 }}
              image={`${baseUrl}${event.image}`}
              title={event.title}
            />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
            </CardContent>
            <CardActions>
         
            <Link to={`/EventDetails/${event._id}`}>
  <button className="learn-more btn">
    <span className="circle" aria-hidden="true">
      <span className="icon arrow"></span>
    </span>
    <span className="button-text">Learn More</span>
  </button>
</Link>

            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  </div>
</div>

  
  
  );
}

export default EventList;
