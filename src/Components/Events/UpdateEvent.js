
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "./Services";
import { useNavigate } from "react-router-dom";

function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"));
  let connectedUserId;
  if (userId._id) {
    connectedUserId = userId.username;
  } else if (userId.facebookId) {
    connectedUserId = userId.username;
  } else {
    connectedUserId = null;
  }
  console.log(connectedUserId);
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleFileChange = (e) => {
    setEvent({ ...event, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("date", event.date);
    formData.append("location", event.location);
    formData.append("description", event.description);
    formData.append("image", event.image);
    formData.append('organizer', connectedUserId);
    try {
      await updateEvent(id, formData);
      alert("event updated");
      navigate("/Event");
    } catch (err) {
      console.error(err);
    }
  };
  
  const formattedDate = event.date.slice(0, -5); // remove the last 5 characters (including the milliseconds)

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Update Event</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    value={event.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
  type="datetime-local"
  name="date"
  id="date"
  className="form-control"
  value={formattedDate}
  onChange={handleChange}
/>

                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="form-control"
                    value={event.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows="5"
                    value={event.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                
<input
    type="file"
    name="image"
    id="image"
    accept=".jpg,.png,.jpeg"
    className="form-control"
    onChange={handleFileChange}
/>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEvent;