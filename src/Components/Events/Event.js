import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getEvents } from "./Services";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const baseUrl = "http://localhost:3000/uploads/"; // Replace with your base URL



  return (
    <div>
      <div className="inner-page-banner">
        <div className="breadcrumb-vec-btm">
          <img
            className="img-fluid"
            src="assets/images/bg/inner-banner-btm-vec.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-6 align-items-center">
              <div className="banner-content">
                <h1>Events</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      Events
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner-img d-lg-block d-none">
                <div className="banner-img-bg">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/inner-banner-vec.png"
                    alt=""
                  />
                </div>
                <img
                  className="img-fluid"
                  src="assets/images/bg/inner-banner-img.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-grid-pages pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5 justify-content-center mb-70">
            {events.map((event) => (
              <div className="col-lg-8" key={event._id}>
                <div className="blog-st-card mb-60">
                  <div className="blog-img">
                  <img
              className="img-fluid"
              width="400"
              height="300"
              src={`${baseUrl}${event.image}`}
              alt={event.title}
            />
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <ul>
                        <li>
                          <a href="">{event.date}</a>
                        </li>
                        <li>
                          <a href="">By, {event.organizer}</a>
                        </li>
                      </ul>
                    </div>
                    <h4>
                      <a href="">{event.title}</a>
                    </h4>
                    <p>{event.description}</p>
                    <div className="more-btn">
                    <NavLink to={`/EventDetails/${event._id}`}>
        More
      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventList;