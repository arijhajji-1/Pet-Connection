import React, { useEffect, useState } from "react";
// import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useDispatch } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";

import {
        getPublicationById, getNewestPubs,
        getOwnerPublication, getallComments,
        addCommentAPI, addReplytoCommentAPI, IgnoreVoteAPI, addVoteAPI
} from "./api";
// import * as api from "./api";

import { useParams } from 'react-router-dom';


import './detailsPublication.css';

import moment from 'moment'; //pour la mise en forme du date 

import AddCommnet from "./AddCommnetPopup";


import ReplyComponent from './Reply'

// import CommnetComponent from './Commnet'

import NewestPost from "./NewestPost";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DetailsPublications() {

        const [showPopup, setShowPopup] = useState(false);


        const [user, setUser] = useState(null);


        const { idpub } = useParams();
        const [publication, setpublication] = useState([]);

        const [imageSrc, setImageSrc] = useState(''); // importer image user 
        const [NewestpublicationData, setNewestPublicationData] = useState([]);

        const [ownerPub, setOwnerPub] = useState([]);

        const [comments, setComments] = useState([]);

        const [replys, setReplys] = useState([]);

        const [userInfo, setUserInfo] = useState({}); // importer image user 

        const [imageUserCommnet, setImageUserCommnet] = useState(''); // importer image user 


        //comment to add
        const [commenttoadd, setCommentToAdd] = useState({
                text: '',
                publication: '',


        });


        const [IdCommnet, setIdComment] = useState('');














        //formatdate
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        //

        useEffect(() => {

                //        await getPublicationById(idpub).then((data) => {
                //                 console.log(data)
                //                 setpublication(data);
                //         })



                //Get Publication
                const PublicationDetails = async () => {
                        const data = await getPublicationById(idpub)
                        setpublication(data);

                        if (data.image) {
                                await axios.get(`http://localhost:3000/publication/imagePublication/${data._id}/image`, { responseType: 'blob' })
                                        .then(res => {
                                                const url = URL.createObjectURL(res.data);
                                                setImageSrc(url);
                                                console.log("url image--->" + url)

                                        })
                                        .catch(error => {
                                                console.error(error);
                                        });
                        }

                        const ownerPub = await getOwnerPublication(idpub)
                        setOwnerPub(ownerPub);


                        // ****************
                        const listcomments = await getallComments(idpub)
                        setComments(listcomments);
                        console.log(listcomments)




                        //********************get image user commment ************* */

                        axios.get(`http://localhost:3000/user/imageUser/${data.user}/image`, { responseType: 'blob' })
                                .then(res => {
                                        const url = URL.createObjectURL(res.data);
                                        setImageUserCommnet(url);
                                        console.log("url image--->" + url)

                                })
                                .catch(error => {
                                        console.error(error);
                                });




                        //********get user info */

                        await axios.get(`http://localhost:3000/user/userInfo/${data.user}/userInfo`)
                                .then(res => {
                                        setUserInfo(res.data);
                                        console.log("userinfo--->" + res)

                                })
                                .catch(error => {
                                        console.error(error);
                                });










                };
                PublicationDetails();

                //Get NewestPublicationData

                const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
                setUser(userFromLocalStorage);
                console.log("userFromLocalStorage  - >" + userFromLocalStorage._id)




                const NewestPublicationData = async () => {
                        const data = await getNewestPubs(userFromLocalStorage._id)
                        setNewestPublicationData(data);

                };
                NewestPublicationData();







        }, []);




        const handleAddComment = async (comment) => {
                // setComments([...comments, comment]);

                //  setCommentToAdd({ ...commenttoadd,  text: comment.text}  );

                //  setCommentToAdd({ ...commenttoadd,  publication: idpub}  );

                const updatedCommentToAdd = {
                        ...commenttoadd,
                        text: comment.text,
                        publication: idpub,
                };


                setCommentToAdd(updatedCommentToAdd);
                console.log(updatedCommentToAdd);
                setShowPopup(false);

                const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
                console.log(userFromLocalStorage);



                if (!IdCommnet) {
                        const res = await addCommentAPI(userFromLocalStorage._id, updatedCommentToAdd)
                        console.log("--> " + JSON.stringify(res.data.comment));
                }

                if (IdCommnet) {
                        console.log("IdCommnet " + IdCommnet)

                        const res = await addReplytoCommentAPI(userFromLocalStorage._id, IdCommnet, updatedCommentToAdd)
                        console.log("--> " + JSON.stringify(res.data.comment));
                }









        };





        // pour la traitement des balises html

        const createMarkup = (htmlContent) => {
                return { __html: htmlContent };
        };


        const handleLinkClick = (commentId) => {
                setShowPopup(true);
                setIdComment(commentId);
        };



        const handleVote = async (votetype) => {

                const pubid = publication._id


                const vote = {
                        userId: user._id,
                        type: votetype

                }

                // alert(vote.userId  +"-----"+  vote.type )


                const res = await addVoteAPI(pubid, vote)

                if (res.message === "dejavote") {

                        notifyErr("You have voted for this post.")
                }

                if (res.message === "voteeffectuee") {

                        notify("vote effect with success")
                }



                //  mis a jour data 

                const data = await getPublicationById(idpub)
                setpublication(data);
                // 





        }



        const IgnoreVote = async () => {


                const pubid = publication._id
                const userId = user._id


                const res = await IgnoreVoteAPI(pubid, userId)
                notify(JSON.stringify(res.message))

                //  mis a jour data 

                const data = await getPublicationById(idpub)
                setpublication(data);
                // 

        }







        const notify = (msg) => toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
        });


        const notifyErr = (msg) => toast.error(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
        });




            // CSS styles for the no comments message
    const noCommentsStyle = {
        color: "gray",
        fontStyle: "italic",
        marginTop: "10px",
    };



        return (

                <div>
                        <ToastContainer />


                        <div className="inner-page-banner">
                                <div className="breadcrumb-vec-btm">
                                        <img className="img-fluid" src="../assets/images/bg/inner-banner-btm-vec.png" alt="" />
                                </div>
                                <div className="container">
                                        <div className="row justify-content-center align-items-center text-center">
                                                <div className="col-lg-6 align-items-center">
                                                        <div className="banner-content">
                                                                <h1>Blog Details</h1>
                                                                <nav aria-label="breadcrumb">
                                                                        <ol className="breadcrumb">
                                                                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                                                                <li className="breadcrumb-item active" aria-current="page">Blog Details</li>
                                                                        </ol>
                                                                </nav>
                                                        </div>
                                                </div>
                                                <div className="col-lg-6">
                                                        <div className="banner-img d-lg-block d-none">
                                                                <div className="banner-img-bg">
                                                                        <img className="img-fluid" src="../assets/images/bg/inner-banner-vec.png" alt="" />
                                                                </div>
                                                                <img className="img-fluid" src="../assets/images/bg/inner-banner-img.png" alt="" />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>



                        <div className="blog-details-pages pt-120 mb-120">
                                <div className="container">
                                        <div className="row g-lg-4 gy-5 justify-content-center mb-70">
                                                <div className="col-lg-8">
                                                        <div className="blog-details-wrap mb-120">
                                                                <div className="post-thum">

                                                                        {/* <img  src={ imageSrc } className="img-fluid my-custom-class"  alt="blog-dt-img" />  */}

                                                                        <img src={imageSrc} className=" img-fluid imagedetals" alt="blog-dt-img" />




                                                                        <div className="category">
                                                                                <a>{publication.category}</a>
                                                                        </div>
                                                                </div>
                                                                <div className="blog-meta">
                                                                        <ul>
                                                                                {/* <li><a href="blog-grid.html">{new Date(publication.createdAt).toLocaleString('fr-FR', options)}</a></li> */}
                                                                                <li><a href="blog-grid.html"> {moment(publication.createdAt).format('DD MMMM, YYYY [At] hh.mm')}</a></li>



                                                                                <li><a href="blog-grid.html">By, {ownerPub.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Email : {ownerPub.email}  </a></li>
                                                                        </ul>
                                                                </div>
                                                                <h2 className="post-title">{publication.titre}</h2>
                                                                <div className="post-content">

                                                                        <blockquote>
                                                                                <p><sup><img src="../assets/images/icon/quage-icon-top.svg" alt="image" /></sup>
                                                                                        &nbsp; <p dangerouslySetInnerHTML={createMarkup(publication.description)}></p>&nbsp;&nbsp;
                                                                                        <sub><img src="../assets/images/icon/quage-icon-btm.svg" alt="image" /></sub></p>

                                                                        </blockquote>
                                                                </div>



                                                                <div className="blog-tag-social-area" style={{ marginTop: '100px' }}>
                                                                        <div className="bolg-tag">
                                                                                {/* <button onClick={() => setShowPopup(true)} className="primary-btn2" style={{ padding: "0px 10px" }}> Add comment</button> */}

                                                                                {/* <button onClick={() => setShowPopup(true)} type="button" className="btn btn-success add-btn">
                                                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                                                        &nbsp;&nbsp;add Comment

                                                                                </button> */}


                                                                        </div>



                                                                        {/*  */}

                                                                        <div className="col-lg-12" style={{ marginBottom: "-100px" }}>
                                                                                <div className="widget-area">

                                                                                        <div className="single-widgets widget_egns_categoris mb-30">
                                                                                                <div className="widget-title">
                                                                                                        <h3>Vote system</h3>
                                                                                                </div>
                                                                                                <ul className="wp-block-categoris-cloud">

                                                                                                        <div>
                                                                                                                <button style={{ marginRight: "15px" }} class="btn btn-success "><i i style={{ marginRight: "15px" }} class="fa-solid fa-thumbs-up"

                                                                                                                        onClick={() => handleVote('voteUp')}



                                                                                                                ></i>

                                                                                                                        {publication.voteUp}</button>





                                                                                                                <button class="btn btn-danger"
                                                                                                                        onClick={() => handleVote('voteDown')}






                                                                                                                ><i i style={{ marginRight: "15px" }} class="fa-solid fa-thumbs-down"></i>

                                                                                                                        {publication.voteDown} </button>









                                                                                                                <button style={{ marginLeft: "100px" }} class="btn btn-warning"
                                                                                                                        onClick={() => IgnoreVote()}


                                                                                                                >
                                                                                                                        <i style={{ marginRight: "15px" }} class="fas fa-ban"></i>
                                                                                                                        Ignore vote
                                                                                                                </button>



                                                                                                        </div>
                                                                                                </ul>
                                                                                        </div>

                                                                                </div>
                                                                        </div>




                                                                        {/*  */}



                                                                        {/* 
                                                                        <div className="social-area">


                                                                                <span>Share:</span>
                                                                                <ul className="social-link d-flex align-items-center">
                                                                                        <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>

                                                                                        <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                                                                </ul>
                                                                        </div> */}

                                                                </div>
                                                        </div>



                                                        {/* mes comments */}
                                                        <div className="col-lg-12">
                                                                <div className="widget-area">

                                                                        <div className="single-widgets widget_egns_categoris mb-30">
                                                                                <div className="widget-title">
                                                                                        <h3>    Comment
                                                                                                <button onClick={() => setShowPopup(true)} type="button" className="btn btn-success add-btn" style={{ marginLeft: "500px" }}>
                                                                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                                                                        &nbsp;&nbsp;add Comment

                                                                                                </button>
                                                                                        </h3>








                                                                                </div>
                                                                                <ul className="wp-block-categoris-cloud">








                                                                                        {/*  */}
                                                                                        <div className="comment-area">


                                                                                                <div className="blog-comments mb-120">

                                                                                                        {/* <div className="comments-title">
                                                                                                                <h2>Comment</h2>
                                                                                                        </div> */}
                                                                                                        {/* <button onClick={() => setShowPopup(true)}>Ajouter un commentaire</button> */}

                                                                                                        {showPopup && <AddCommnet isOpen='showPopup' onClose={() => setShowPopup(false)} onSubmit={handleAddComment} />}





                                                                                                        {/* ************comments ********************************************** */}


                                                                                                        {comments.length > 0 ? (
                                                                                                                comments.map((comment) => (
                                                                                                                        // code pour afficher chaque commentaire

                                                                                                                        <ul style={{ marginTop: '66px' }} className="comment-list">
                                                                                                                                <li>
                                                                                                                                        {/* remplacer ce code avec le composnat Commnets */}

                                                                                                                                        <div className="single-comment mb-50 d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                                                                                                                                <div className="comment-content">
                                                                                                                                                        <div className="c-header d-flex align-items-center justify-content-between">
                                                                                                                                                                <div className="author-area">
                                                                                                                                                                        <div className="author-img">
                                                                                                                                                                                {/* <img src="../assets/images/blog/blog-author.png" alt="" /> */}
                                                                                                                                                                                <img className="rounded-circle" src={imageUserCommnet} alt="" />

                                                                                                                                                                        </div>
                                                                                                                                                                        <div className="author-details">
                                                                                                                                                                                <h5 className="mb-0">{userInfo.name}</h5>
                                                                                                                                                                                {/* <div className="c-date">11 January, 2022 At 01.56 pm</div> */}
                                                                                                                                                                                <div className="c-date">{moment(comment.createdAt).format('DD MMMM, YYYY [At] hh.mm')}</div>

                                                                                                                                                                        </div>
                                                                                                                                                                </div>

                                                                                                                                                                <div style={{ marginLeft: '206px' }} className="replay-btn">
                                                                                                                                                                        <a onClick={() => handleLinkClick(comment._id)} ><img src="../assets/images/icon/replay-icon.svg" alt="" />
                                                                                                                                                                                Reply</a>
                                                                                                                                                                </div>
                                                                                                                                                        </div>


                                                                                                                                                        <div className="c-body">
                                                                                                                                                                <p dangerouslySetInnerHTML={createMarkup(comment.text)}></p>
                                                                                                                                                        </div>
                                                                                                                                                </div>
                                                                                                                                        </div>

                                                                                                                                        {/* remplacer ce code avec le composnat Commnets */}







                                                                                                                                        {/* --------- comment-reply ------------ */}

                                                                                                                                        {comment.replies.map(replyId => (

                                                                                                                                                <ul className="comment-reply">
                                                                                                                                                        <li key={replyId}>
                                                                                                                                                                <ReplyComponent replyId={replyId} />



                                                                                                                                                        </li>
                                                                                                                                                </ul>
                                                                                                                                        ))}


                                                                                                                                </li>
                                                                                                                        </ul>


                                                                                                                ))
                                                                                                        ) : (
                                                                                                                <p style={noCommentsStyle}>Be the first to comment !</p>
                                                                                                        )}



                                                                                                        {/* *********************************************************** */}

                                                                                                </div>


                                                                                                {/* comment-form */}


                                                                                        </div>
                                                                                        {/*  */}

                                                                                </ul>
                                                                        </div>

                                                                </div>
                                                        </div>




                                                        {/*  */}
                                                </div>
                                                <div className="col-lg-4">
                                                        <div className="widget-area">
                                                                <div className="single-widgets widget_search mb-30">
                                                                        <form>
                                                                                <div className="wp-block-search__inside-wrapper ">
                                                                                        <input type="search" id="wp-block-search__input-1" className="wp-block-search__input" name="s" defaultValue placeholder="Search Here" required />
                                                                                        <button type="submit" className="wp-block-search__button">
                                                                                                <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M7.10227 0.0713005C1.983 0.760967 -1.22002 5.91264 0.44166 10.7773C1.13596 12.8 2.60323 14.471 4.55652 15.4476C6.38483 16.3595 8.59269 16.5354 10.5737 15.9151C11.4023 15.6559 12.6011 15.0218 13.2121 14.5126L13.3509 14.3969L16.1281 17.1695C19.1413 20.1735 18.9932 20.0531 19.4237 19.9698C19.6505 19.9281 19.9282 19.6504 19.9699 19.4236C20.0532 18.9932 20.1735 19.1413 17.1695 16.128L14.397 13.3509L14.5127 13.212C14.7858 12.8834 15.2394 12.152 15.4755 11.6614C17.0029 8.48153 16.3271 4.74159 13.7814 2.28379C11.9994 0.561935 9.52304 -0.257332 7.10227 0.0713005ZM9.38418 1.59412C11.0135 1.9135 12.4669 2.82534 13.4666 4.15376C14.0591 4.94062 14.4572 5.82469 14.6793 6.83836C14.8136 7.44471 14.8228 8.75925 14.7025 9.34708C14.3507 11.055 13.4713 12.4622 12.1336 13.4666C11.3467 14.059 10.4627 14.4571 9.44898 14.6793C8.80097 14.8228 7.48644 14.8228 6.83843 14.6793C4.78332 14.2303 3.0985 12.9389 2.20054 11.1337C1.75156 10.2312 1.54328 9.43503 1.49699 8.4445C1.36276 5.62566 3.01055 3.05677 5.6535 1.96904C6.10248 1.7839 6.8014 1.59412 7.28741 1.52932C7.74102 1.46452 8.92595 1.50155 9.38418 1.59412Z">
                                                                                                        </path>
                                                                                                </svg>
                                                                                        </button>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                                <div className="single-widgets widget_egns_categoris mb-30">
                                                                        <div className="widget-title">
                                                                                <h3>Category</h3>
                                                                        </div>
                                                                        <ul className="wp-block-categoris-cloud">
                                                                                <li><a ><span>Pet Grooming</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span></a></li>
                                                                                <li><a ><span>Medical Care</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                                                                <li><a ><span>Pet Bording</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                                                                <li><a ><span>Pet Daycare</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                                                                <li><a ><span>Pet Walking</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                                                                <li><a ><span>Education Pet</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                                                        </ul>
                                                                </div>


                                                                <div className="single-widgets widget_egns_recent_post mb-30">
                                                                        <div className="widget-title">
                                                                                <h3>Newest Posts</h3>
                                                                        </div>
                                                                        <div className="recent-post-wraper">



                                                                                {NewestpublicationData.map((Newpublication) => (
                                                                                        <NewestPost publication={Newpublication} />




                                                                                ))}


                                                                        </div>





                                                                </div>




                                                        </div>



                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>



        )


}
export default DetailsPublications;
