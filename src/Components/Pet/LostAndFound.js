import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { Link } from 'react-router-dom';



function AddPet() {
    const [selectedLostPetId, setSelectedLostPetId] = useState(null);
    const [lostPets, setLostPets] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:3000/pet/getAllLostAndFound')
          .then(response => {
            setLostPets(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    
    return (<div>

        <div className="inner-page-banner">
            <div className="breadcrumb-vec-btm">
                <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
            </div>
            <div className="container">
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-lg-6 align-items-center">
                        <div className="banner-content">
                            <h1>Lost And Found </h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Lost And Found </li>
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
                        <div className="row g-lg-4 gy-5 justify-content-center mb-70">
                        {lostPets.map(pet => (
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                <div className="h1-blog-card">
                                    <div className="blog-img">
                                        <img className="img-fluid" src={`http://127.0.0.1:3000/pet/image/${pet.image}`} alt="" />
                                        
                                        <div className="category">
                                            <a href="blog-grid.html"> {pet.type}</a>
                                        </div>
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <a href="blog-grid.html">{pet.location}</a>
                                        </div>
                                        <h4><a href="blog-details.html">  {pet.description}</a></h4>
                                        <Link to={`/lostdetail/${pet._id}`} >
                                                {pet.description}
                                            </Link>
                                    </div>
                                </div>
                            </div>
                             ))}
                        </div>
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <div className="paginations-area">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-left-short"></i></a></li>
                                            <li className="page-item active"><a className="page-link" href="#">01</a></li>
                                            <li className="page-item"><a className="page-link" href="#">02</a></li>
                                            <li className="page-item"><a className="page-link" href="#">03</a></li>
                                            <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-right-short"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="widget-area">
                            <div className="single-widgets widget_search mb-30">
                                <form>
                                    <div className="wp-block-search__inside-wrapper ">
                                        <input type="search" id="wp-block-search__input-1" className="wp-block-search__input" name="s" value="" placeholder="Search Here" required="" />
                                        <button type="submit" className="wp-block-search__button">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.10227 0.0713005C1.983 0.760967 -1.22002 5.91264 0.44166 10.7773C1.13596 12.8 2.60323 14.471 4.55652 15.4476C6.38483 16.3595 8.59269 16.5354 10.5737 15.9151C11.4023 15.6559 12.6011 15.0218 13.2121 14.5126L13.3509 14.3969L16.1281 17.1695C19.1413 20.1735 18.9932 20.0531 19.4237 19.9698C19.6505 19.9281 19.9282 19.6504 19.9699 19.4236C20.0532 18.9932 20.1735 19.1413 17.1695 16.128L14.397 13.3509L14.5127 13.212C14.7858 12.8834 15.2394 12.152 15.4755 11.6614C17.0029 8.48153 16.3271 4.74159 13.7814 2.28379C11.9994 0.561935 9.52304 -0.257332 7.10227 0.0713005ZM9.38418 1.59412C11.0135 1.9135 12.4669 2.82534 13.4666 4.15376C14.0591 4.94062 14.4572 5.82469 14.6793 6.83836C14.8136 7.44471 14.8228 8.75925 14.7025 9.34708C14.3507 11.055 13.4713 12.4622 12.1336 13.4666C11.3467 14.059 10.4627 14.4571 9.44898 14.6793C8.80097 14.8228 7.48644 14.8228 6.83843 14.6793C4.78332 14.2303 3.0985 12.9389 2.20054 11.1337C1.75156 10.2312 1.54328 9.43503 1.49699 8.4445C1.36276 5.62566 3.01055 3.05677 5.6535 1.96904C6.10248 1.7839 6.8014 1.59412 7.28741 1.52932C7.74102 1.46452 8.92595 1.50155 9.38418 1.59412Z"></path>
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
                                    <li><a href="blog-grid.html"><span>Pet Grooming</span> <span><span className="number-of-categoris">(30)</span><i className="bi bi-arrow-right-short"></i></span></a></li>
                                    <li><a href="blog-grid.html"><span>Medical Care</span> <span><span className="number-of-categoris">(18)</span><i className="bi bi-arrow-right-short"></i></span> </a></li>
                                    <li><a href="blog-grid.html"><span>Pet Bording</span> <span><span className="number-of-categoris">(21)</span><i className="bi bi-arrow-right-short"></i></span> </a></li>
                                    <li><a href="blog-grid.html"><span>Pet Daycare</span> <span><span className="number-of-categoris">(25)</span><i className="bi bi-arrow-right-short"></i></span> </a></li>
                                    <li><a href="blog-grid.html"><span>Pet Walking</span> <span><span className="number-of-categoris">(29)</span><i className="bi bi-arrow-right-short"></i></span> </a></li>
                                    <li><a href="blog-grid.html"><span>Education Pet</span> <span><span className="number-of-categoris">(31)</span><i className="bi bi-arrow-right-short"></i></span> </a></li>
                                </ul>
                            </div>
                            <div className="single-widgets widget_egns_recent_post mb-30">
                                <div className="widget-title">
                                    <h3>Newest Posts</h3>
                                </div>
                                <div className="recent-post-wraper">
                                    <div className="widget-cnt mb-25">
                                        <div className="wi">
                                            <a href="blog-details.html"><img src="assets/images/blog/blog-sidebar-1.png" alt="image" /></a>
                                        </div>
                                        <div className="wc">
                                            <a href="blog-grid.html">July 18, 2022</a>
                                            <h6><a href="blog-details.html">Quisque laoreet Maecento facilisis tristique.</a></h6>
                                        </div>
                                    </div>
                                    <div className="widget-cnt mb-25">
                                        <div className="wi">
                                            <a href="blog-details.html"><img src="assets/images/blog/blog-sidebar-2.png" alt="image" /></a>
                                        </div>
                                        <div className="wc">
                                            <a href="blog-grid.html">July 15, 2022</a>
                                            <h6><a href="blog-details.html">Etiam vel diam volutpatha pellentesque.</a></h6>
                                        </div>
                                    </div>
                                    <div className="widget-cnt">
                                        <div className="wi">
                                            <a href="blog-details.html"><img src="assets/images/blog/blog-sidebar-3.png" alt="image" /></a>
                                        </div>
                                        <div className="wc">
                                            <a href="blog-grid.html">July 14, 2022</a>
                                            <h6><a href="blog-details.html">Nunc finibus gravidato on porta. Nulla vitae.</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-widgets widget_egns_tag mb-30">
                                <div className="widget-title">
                                    <h3>All Tag</h3>
                                </div>
                                <p className="wp-block-tag-cloud">
                                    <a href="blog-grid.html">Grooming</a>
                                    <a href="blog-grid.html">Walking</a>
                                    <a href="blog-grid.html">Pet Care</a>
                                    <a href="blog-grid.html">Daycare</a>
                                    <a href="blog-grid.html">Bording</a>
                                    <a href="blog-grid.html">Madical</a>
                                    <a href="blog-grid.html">Vakcine</a>
                                    <a href="blog-grid.html">Education</a>
                                    <a href="blog-grid.html">Services</a>
                                </p>
                            </div>
                            <div className="single-widgets widget_egns_social">
                                <div className="widget-title">
                                    <h3>Social</h3>
                                </div>
                                <ul className="social-link d-flex align-items-center">
                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook"></i></a></li>
                                    <li><a href="https://twitter.com/"><i className="bx bxl-twitter"></i></a></li>
                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt"></i></a></li>
                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>);
}

export default AddPet;