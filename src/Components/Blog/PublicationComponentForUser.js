import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useDispatch } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";

import { getallPublication, getNewestPubs, deletePublication } from "./api";
import { Link } from 'react-router-dom';

import { Modal } from 'react-bootstrap';

import './detailsPublication.css';


function PublicationComponentForUser({ publication }) {

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



    async function deleteUser(pubId) {

        await deletePublication(pubId)
    }





    const [showDelete, setShowDelete] = useState(false);

    const handleDeletePost = () => {
        setShowDelete(true);
    }



    async function deletePost(postId) {

        await deletePublication(postId).then(
            //  alert("Commnet hes been deleteaad")

        )
    }








    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (<>






        <div key={publication.id} className="col-lg-6 col-md-6 col-sm-10">
            <div className="h1-blog-card">
                <div className="blog-img">

                    <img src={imageSrcPub} class="img-fluid" className="imagePublication" />








                    {/*  */}




                    <div className="category">
                        {/* <a href="blog-grid.html">more details</a> */}
                        <Link to={`/detalsPublications/${publication._id}`}>more details</Link>

                    </div>
                </div>
                <div className="blog-content">
                    <div className="blog-meta">
                        <a href="blog-grid.html">{new Date(publication.createdAt).toLocaleString()}</a>

                    </div>
                    <h4>
                        {/* <a href="blog-details.html">{publication.description.substring(0, 50)}...</a> */}
                        <a> <p dangerouslySetInnerHTML={createMarkup(publication.titre)}/></a>

                        {/* <a href="" dangerouslySetInnerHTML={createMarkup(publication.description.substring(0, 50))}>...</a> */}




                    </h4>




                    <div class="container">
                        <div class="row justify-content-md-center">

                            <div class="col-md-auto">
                                {/* <button type="button" class="btn btn-success mt-5" style={{ marginRight: '20px' }}>
                                   <Link to={`/UpdatePublication/${publication._id}`} style={{textDecoration :'none' ,color: 'white'}}>Update</Link>

                                    </button> */}









                                <button type="button" class="btn  mt-5"

                                    onClick={handleDeletePost}

                                >
                                <i  style={{ color: 'red' }} className="pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto fa fa-trash" aria-hidden="true"></i>

                                    
                                     {/* delete */}
                                
                                </button>

                                {/*  */}
                                <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Post</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure to Delete this Post?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowDelete(false)}>
                                            No
                                        </Button>
                                        <Button   style={{backgroundColor: "#FF6B55"}} variant="primary" onClick={() => {
                                            // Code à exécuter lorsque l'utilisateur clique sur le bouton "Save changes"
                                            deletePost(publication._id).then(() => {
                                                // history.push('/list');
                                                window.location.reload();

                                            });
                                            // ...
                                            setShowDelete(false);
                                        }}>
                                            Delete Post
                                        </Button>
                                    </Modal.Footer>
                                </Modal>







                            </div>

                        </div>

                    </div>
                </div>

            </div>



        </div >






    </>)

}

export default PublicationComponentForUser;
