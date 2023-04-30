import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useDispatch } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";

import { getallPublication, getNewestPubs, getallPublicationByIdUser, filterOptAPI } from "./api";

import { Link } from 'react-router-dom';
import './detailsPublication.css';


import PublicationComponent from "./PublicationComponent";

import PublicationComponentForUser from "./PublicationComponentForUser";



import NewestPost from "./NewestPost";


import { FaThumbsDown } from 'react-icons/fa';











function Publications() {



    const [user, setUser] = useState(null);


    const [publicationData, setPublicationData] = useState([]);

    const [NewestpublicationData, setNewestPublicationData] = useState([]);


    const [isclickedPubUser, setisclickedPubUser] = useState(false);




    // pagination

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 4;

    const lastIndex = currentPage * recordsPerPage

    const firstIndex = lastIndex - recordsPerPage


    const records = publicationData.slice(firstIndex, lastIndex)


    const npage = Math.ceil(publicationData.length / recordsPerPage)

    console.log("mes data --->" + publicationData)

    const numbres = [...Array(npage + 1).keys()].slice(1)

    // 
    const [imageSrc, setImageSrc] = useState([]); // importer image user 




    useEffect(() => {

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        setUser(userFromLocalStorage);
        console.log("userFromLocalStorage  - >" + userFromLocalStorage._id)


        //Get Publication
        const fetchPublicationData = async () => {



            // const data = await getallPublication(userFromLocalStorage._id)
            // setPublicationData(data);




            if (isclickedPubUser) {
                const pubUser = await getallPublicationByIdUser(userFromLocalStorage._id)
                setPublicationData(pubUser);

                console.log("userIduserIduserId " + userFromLocalStorage._id)
            }
            else {
                const pubUser = await getallPublication(userFromLocalStorage._id)
                setPublicationData(pubUser);

                console.log("userIdgetallPublication " + userFromLocalStorage._id)


            }






        };
        fetchPublicationData();







        //Get NewestPublicationData
        const NewestPublicationData = async () => {
            const data = await getNewestPubs(userFromLocalStorage._id)
            setNewestPublicationData(data);

        };
        NewestPublicationData();

    }, []);














    // ////////////////////////////////////////////

    async function getpublicationUser(userId) {
        setisclickedPubUser(true)

        if (isclickedPubUser == true) {
            const pubUser = await getallPublicationByIdUser(userId)
            setPublicationData(pubUser);

            console.log("userIduserIduserId " + userId)
        }


    }



    async function getallpublicationfunction(userId) {
        setisclickedPubUser(false)


        const pubUser = await getallPublication(userId)
        setPublicationData(pubUser);

        console.log("userIdgetallPublication " + userId)



    }



    // pour le filtre
    async function handleClick(category) {
        // alert(`La valeur passée est : ${category}`);
        const vote = ''

        const titre = ''


        const pubFiltre = await filterOptAPI(titre, category, vote)
        setPublicationData(pubFiltre);



    }

    const [titre, setTitle] = useState('');

    const handleChange = async (event) => {

        const { name, value } = event.target;
        if (name === 'titre') {
            setTitle(value);

        }
    }

    async function handleClickSearch() {

        const vote = ''
        const category = ''

        const pubFiltre = await filterOptAPI(titre, category, vote)
        setPublicationData(pubFiltre);


    }










    // pour la traitement des balises html

    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };



    return (
        <>

            <div>

                <div className="inner-page-banner">
                    <div className="breadcrumb-vec-btm">
                        <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center align-items-center text-center">
                            <div className="col-lg-6 align-items-center">
                                <div className="banner-content">
                                    <h1>Blog Grid Sidebar</h1>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Blog Grid Sidebar</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="banner-img d-lg-block d-none">
                                    <div className="banner-img-bg">
                                        <img className="img-fluid" src="assets/images/bg/inner-banner-vec.png" alt="" />
                                    </div>
                                    <img className="img-fluid" src="assets/images/bg/inner-banner-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="blog-grid-pages pt-120 mb-120">
                    <div className="container">
                        <div className="row g-lg-4 gy-5 justify-content-center">
                            <div className="col-lg-8">

                                <button className="btn btn-success add-btn">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    &nbsp;&nbsp;
                                    <Link to="/AddPublication" style={{ color: 'white' }}>Add Publication</Link>
                                </button>

                                {/* <button type="submit" className="btn primary-btn1" style={{ padding: "0px 10px" }}> Add comment</button> */}



                                <button onClick={() => getpublicationUser(user._id)} type="button" className="btn primary-btn1   add-btn">


                                    {/* &nbsp;&nbsp;{isclickedPubUser ? "Mes publications" : "Toutes les publications"} */}

                                    Mes publications
                                </button>



                                <button onClick={() => getallpublicationfunction(user._id)} type="button" className="btn reset-btn1 add-btn">

                                    {/* &nbsp;&nbsp;{isclickedPubUser ? "Mes publications" : "Toutes les publications"} */}

                                    Toutes les publications
                                </button>






                                {/* ------------------------- */}
                                {/* <div className="row g-lg-4 gy-5 justify-content-center mb-70 mt-5">



                                    {records.map((mypublication) => (



                                        isclickedPubUser==true ? (
                                            <PublicationComponentForUser publication={mypublication} />
                                        ) : (
                                            <PublicationComponent publication={mypublication} />
                                        )


                                    ))}


                                </div> */}


                                <div className="row g-lg-4 gy-5 justify-content-center mb-70 mt-5">
                                    {records.filter((mypublication) => mypublication.isBlocked === false).map((mypublication) => (
                                        isclickedPubUser ? (
                                            <PublicationComponentForUser publication={mypublication} />
                                        ) : (
                                            <PublicationComponent publication={mypublication} />
                                        )
                                    ))}
                                </div>




                                {/* ---------//-pub--------------------- */}


                                {/* pagination */}
                                <div className="row">
                                    <div className="col-lg-12 d-flex justify-content-center">
                                        <div className="paginations-area">
                                            <nav aria-label="Page navigation example">

                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link"
                                                            onClick={prePage}>

                                                            <i className="bi bi-arrow-left-short" /></a>

                                                    </li>

                                                    {

                                                        numbres.map((n, i) => (
                                                            <li className={`page-item ${currentPage === n ? `active` : ``}   `} key={i}     >

                                                                <a className="page-link"

                                                                    onClick={() => changeCPage(n)}>{n}</a>

                                                            </li>




                                                        ))

                                                    }

                                                    <li className="page-item">
                                                        <a className="page-link"
                                                            onClick={nextPage}>

                                                            <i className="bi bi-arrow-right-short" /></a>

                                                    </li>






                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------//-pub--------------------- */}


                            <div className="col-lg-4">
                                <div className="widget-area">
                                    <div className="single-widgets widget_search mb-30">

                                        <div className="wp-block-search__inside-wrapper ">
                                            <input name="titre" value={titre} onChange={handleChange} type="search" id="wp-block-search__input-1" className="wp-block-search__input" placeholder="Search Here" required />


                                            <button onClick={handleClickSearch} className="wp-block-search__button">


                                                <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.10227 0.0713005C1.983 0.760967 -1.22002 5.91264 0.44166 10.7773C1.13596 12.8 2.60323 14.471 4.55652 15.4476C6.38483 16.3595 8.59269 16.5354 10.5737 15.9151C11.4023 15.6559 12.6011 15.0218 13.2121 14.5126L13.3509 14.3969L16.1281 17.1695C19.1413 20.1735 18.9932 20.0531 19.4237 19.9698C19.6505 19.9281 19.9282 19.6504 19.9699 19.4236C20.0532 18.9932 20.1735 19.1413 17.1695 16.128L14.397 13.3509L14.5127 13.212C14.7858 12.8834 15.2394 12.152 15.4755 11.6614C17.0029 8.48153 16.3271 4.74159 13.7814 2.28379C11.9994 0.561935 9.52304 -0.257332 7.10227 0.0713005ZM9.38418 1.59412C11.0135 1.9135 12.4669 2.82534 13.4666 4.15376C14.0591 4.94062 14.4572 5.82469 14.6793 6.83836C14.8136 7.44471 14.8228 8.75925 14.7025 9.34708C14.3507 11.055 13.4713 12.4622 12.1336 13.4666C11.3467 14.059 10.4627 14.4571 9.44898 14.6793C8.80097 14.8228 7.48644 14.8228 6.83843 14.6793C4.78332 14.2303 3.0985 12.9389 2.20054 11.1337C1.75156 10.2312 1.54328 9.43503 1.49699 8.4445C1.36276 5.62566 3.01055 3.05677 5.6535 1.96904C6.10248 1.7839 6.8014 1.59412 7.28741 1.52932C7.74102 1.46452 8.92595 1.50155 9.38418 1.59412Z">
                                                    </path>
                                                </svg>
                                            </button>





                                        </div>

                                    </div>
                                    <div className="single-widgets widget_egns_categoris mb-30">
                                        <div className="widget-title">
                                            <h3>Category</h3>
                                        </div>
                                        <ul className="wp-block-categoris-cloud">
                                            <li onClick={() => handleClick("Pet Grooming")}><a ><span>Pet Grooming</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span></a></li>
                                            <li onClick={() => handleClick("Medical Care")}><a><span>Medical Care</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                            <li onClick={() => handleClick("Pet Grooming")}><a ><span>Pet Bording</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                            <li onClick={() => handleClick("Pet Daycare")}><a><span>Pet Daycare</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>
                                            <li onClick={() => handleClick("Pet Walking")}><a><span>Pet Walking</span> <span><span className="number-of-categoris">&rarr;</span><i className="bi bi-arrow-right-short" /></span> </a></li>



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




        </>
    )




    // pagination
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        if (currentPage != npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    // 




}

export default Publications;