import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { addcomment,fetchProducts } from './ReducersCom/comment';
import Comments from "./comments/Comment"
function LostDetails() {
    const { id } = useParams();
    const [lostPet, setLostPet] = useState({});
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [comments,setComments]=useState([]);
 
  useEffect(() => {
    const fetchLostPetById = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/pet/lostbyid/${id}`);
        const data = await response.json();
        setLostPet(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLostPetById();
  }, [id]);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/pet/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //formData.append("user", JSON.stringify(user));
    formData.append("content",comment)
    dispatch(addcomment({ formData }));
  };
    return (
        <div>
            <div className="inner-page-banner">
                <div className="breadcrumb-vec-btm">
                    <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
                </div>
                <div className="container">
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col-lg-6 align-items-center">
                            <div className="banner-content">
                                <h1> Details</h1>
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
                                    <img className="img-fluid" src="/assets/images/bg/inner-banner-vec.png" alt="" />
                                </div>
                                <img className="img-fluid" src="/assets/images/bg/inner-banner-img.png" alt="" />
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


                                <div className="post-content">

                                    <div className="row g-4 align-items-center mb-10 pt-10">
                                        <div className="col-lg-6">
                                            <h2>{lostPet.location}</h2>
                                        
                                        <p>{lostPet.description}</p>
                                        </div>
                                        <div className="col-lg-6">
                                            <img className="img-fluid" src={`http://127.0.0.1:3000/pet/image/${lostPet.image}`}  alt="" />
                                        </div>
                                    </div>
                                    <h2>Luctus justo quis feugiat lacus orcha ornare auguelon Integer gon form together nicelon.</h2>
                                    <p>Pellentesque maximus augue orci, quis congue purus iaculison id. Maecenas eu lorem quisesdoi massal molestie vulputate in sitagi amet diam. Cras eu odio sit amet ipsum cursus for that gone pellentesquea. thisaton Vestibulum ut aliquet risus. In hac habitasse plateajoa dictumst. Nuncet posuere scelerisque justo in accumsan.Pellentesque maximus augue orci, quis congue purus iaculison id. Maecenas eu lorem quisesdoi massal molestie vulputate in sitagi amet diam. Cras eu odio sit amet ipsum cursus for that gone pellentesquea. thisaton Vestibulum ut aliquet risus. In hac habitasse plateajoa dictumst. Nuncet posuere scelerisque justo in accumsan.</p>
                                </div>
                                <div className="blog-tag-social-area">
                                    <div className="bolg-tag">
                                        <ul>
                                            <li><a href="blog-grid.html">#Pet Care</a></li>
                                            <li><a href="blog-grid.html">#Dog Walking</a></li>
                                            <li><a href="blog-grid.html">#Medical Care</a></li>
                                            <li><a href="blog-grid.html">#Pet Bording</a></li>
                                        </ul>
                                    </div>
                                    <div className="social-area">
                                        <span>Share:</span>
                                        <ul className="social-link d-flex align-items-center">
                                            <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook"></i></a></li>
                                            <li><a href="https://twitter.com/"><i className="bx bxl-twitter"></i></a></li>
                                            <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt"></i></a></li>
                                            <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-area">
                                <div className="blog-comments mb-120">
                                    <div className="comments-title">
                                        <h2>Comment</h2>
                                    </div>
                                    <ul className="comment-list">
                                    {comments.map(pet => (    
                                        <li>
                                            <div className="single-comment mb-50 d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                                <div className="comment-content">
                                                    <div className="c-header d-flex align-items-center justify-content-between">
                                                        <div className="author-area">
                                                            <div className="author-img">
                                                                <img src="/assets/images/blog/blog-author.png" alt="" />
                                                            </div>
                                                            <div className="author-details">
                                                                <h5 className="mb-0">Angilano Cooper</h5>
                                                                <div className="c-date">{pet.date}</div>
                                                            </div>
                                                        </div>
                                                        <div className="replay-btn">
                                                            <a href="#"><img src="/assets/images/icon/replay-icon.svg" alt="" /> Reply</a>
                                                        </div>
                                                    </div>
                                                    <div className="c-body">
                                                        <p>Pellentesque maximus augue orci, quis congue purus iaculison id. Maecenas eu lorem quisesdoi massal molestie vulputate in sitagi amet diam. Cras eu odio sit amet ipsum cursus for that gone pellentesquea. thisaton Vestibulum ut aliquet risus. In hac habitasse plateajoa dictumst. Nuncet posuere scelerisque justo in accumsan.Pellentesque</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="comment-reply">
                                                <li>
                                                    <div className="single-comment d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                                        <div className="comment-content">
                                                            <div className="c-header d-flex align-items-center justify-content-between">
                                                                <div className="author-area">
                                                                    <div className="author-img">
                                                                        <img src="/assets/images/blog/blog-author1.png" alt="" />
                                                                    </div>
                                                                    <div className="author-details">
                                                                        <h5 className="mb-0">Polard Girdet</h5>
                                                                        <div className="c-date">11 January, 2022 At 01.56 pm</div>
                                                                    </div>
                                                                </div>
                                                                <div className="replay-btn">
                                                                    <a href="#"><img src="/assets/images/icon/replay-icon.svg" alt="" /> Reply</a>
                                                                </div>
                                                            </div>
                                                            <div className="c-body">
                                                                <p>Pellentesque maximus augue orci, quis congue purus iaculison id. Maecenas eu lorem quisesdoi massal molestie vulputate in sitagi amet diam. Cras eu odio sit amet ipsum cursus for that gone pellentesquea. thisaton Vestibulum ut aliquet risus. In hac habitasse plateajoa dictumst. Nuncet posuere scelerisque justo in accumsan.Pellentesque</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                         ))} 
                                    </ul>
                                </div>
                                <div className="comment-form">
                                    <div className="comments-title">
                                        <h2>Leave a Reply</h2>
                                    </div>
                               
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-inner name mb-40">
                                                    <input type="text" placeholder="Enter your name" required="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-inner email mb-40">
                                                    <input type="text" placeholder="Enter your email" required="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-inner mb-40">
                                                    <textarea placeholder="Your message" value={comment}
                                                        onChange={
                                                            (event) => {
                                                                setComment(event.target.value);
                                                            }
                                                        } ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-inner two">
                                                    <button className="primary-btn3 btn-lg" type="submit">Submit Comment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget-area">
                                <div className="single-widgets widget_search mb-30">
                                    <form>
                                        <div className="wp-block-search__inside-wrapper ">
                                            <input type="search" id="wp-block-search__input-1" className="wp-block-search__input" name="s"  placeholder="Search Here" required="" />
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
                                                <a href="blog-details.html"><img src="/assets/images/blog/blog-sidebar-1.png" alt="image" /></a>
                                            </div>
                                            <div className="wc">
                                                <a href="blog-grid.html">July 18, 2022</a>
                                                <h6><a href="blog-details.html">Quisque laoreet Maecento facilisis tristique.</a></h6>
                                            </div>
                                        </div>
                                        <div className="widget-cnt mb-25">
                                            <div className="wi">
                                                <a href="blog-details.html"><img src="/assets/images/blog/blog-sidebar-2.png" alt="image" /></a>
                                            </div>
                                            <div className="wc">
                                                <a href="blog-grid.html">July 15, 2022</a>
                                                <h6><a href="blog-details.html">Etiam vel diam volutpatha pellentesque.</a></h6>
                                            </div>
                                        </div>
                                        <div className="widget-cnt">
                                            <div className="wi">
                                                <a href="blog-details.html"><img src="/assets/images/blog/blog-sidebar-3.png" alt="image" /></a>
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

        </div>
    );
}

export default LostDetails;