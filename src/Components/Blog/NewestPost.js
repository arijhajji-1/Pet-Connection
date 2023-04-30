import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useDispatch } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";

import { getallPublication, getNewestPubs } from "./api";
import { Link } from 'react-router-dom';


import './detailsPublication.css';


function NewestPost({ publication }) {

    const [user, setUser] = useState(null);
    const [imageSrcPub, setImageSrcPub] = useState([]); // importer image user 


    useEffect(() => {

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        setUser(userFromLocalStorage);
        console.log("userFromLocalStorage  - >" + userFromLocalStorage._id)


        getImage(publication._id)


        //Get Publication
        // const fetchPublicationData = async () => {
        //     const data = await getallPublication(userFromLocalStorage._id)
        //     setPublicationData(data);

        //     data.map(async (publication) => (
        //         await getImage(publication._id),
        //         console.log("publication._id" + publication._id)
        //     ))

        // };
        // fetchPublicationData();





    }, [publication._id]);



    async function getImage(publicationId) {
        await axios.get(`http://localhost:3000/publication/imagePublication/${publicationId}/image`, { responseType: 'blob' })
            .then(res => {
                const url = URL.createObjectURL(res.data);
                // setImageSrc(url);
                setImageSrcPub(url);
                console.log("url image pub--->" + url)

            })
            .catch(error => {
                console.error(error);
            });

    }








    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (<>


        <Link to={`/detalsPublications/${publication._id}`}>

            <div key={publication._id} className="widget-cnt mb-25">
                <div className="wi">
                   <a ><img src={imageSrcPub} className="newestImage" alt="image" /></a>

                </div>
                <div className="wc">
                    <a href="blog-grid.html">{new Date(publication.createdAt).toLocaleString()}</a>
                    <h6><a href="blog-details.html">{publication.titre}</a></h6>
                </div>
            </div>



        </Link>


    </>)

}

export default NewestPost;
