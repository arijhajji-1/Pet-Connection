import React, { useEffect } from "react";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';
import ChatBot from "../Pet/Chatbot";
function Home() {
  // useEffect(() => {
  //     console.log(JSON.parse(localStorage.getItem("user"))["_id"]);
  //   },[])
    return ( <div>
      
        <div className="hero2">
          <div className="left-sidebar">
            <div className="swiper-pagination121" />
          </div>
          <div className="swiper hero2-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="hero-wrapper">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="banner-content">
                          <h6>your pet our family</h6>
                          <h1>Your <span>pet</span> is part of our family.</h1>
                          <div className="btn-group">
                            <a className="primary-btn2" href="contact.html">Make a Reservation</a>
                            <a className="primary-btn3" href="about.html">About More </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex justify-content-center">
                        <div className="hero-img">
                          <img className="img-fluid" src="assets/images/bg/hero2-img.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="hero-wrapper">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="banner-content">
                          <h6>your pet our family</h6>
                          <h1>Your <span>cat</span> is part of our family.</h1>
                          <div className="btn-group">
                            <a className="primary-btn2" href="contact.html">Make a Reservation</a>
                            <a className="primary-btn3" href="about.html">About More </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex justify-content-center">
                        <div className="hero-img">
                          <img className="img-fluid" src="assets/images/bg/hero2-img-cat.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-sidebar">
            <div className="social-area">
              <ul>
                <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h2-services-area">
          <div className="services-top">
            <div className="services-section-card">
              <div className="card-vector">
                <img className="services-card-vect-01" src="assets/images/bg/h2-services-title-rt.png" alt="" />
                <img className="services-card-vect-02" src="assets/images/bg/h2-services-title-lb.png" alt="" />
              </div>
              <div className="services-title">
                <h2>See Our All <span>Services.</span></h2>
                <a className="primary-btn2" href="contact.html">Book Your Day</a>
              </div>
            </div>
            <div className="swiper h2-services-slider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="services-card daycare-card">
                    <div className="card-vector">
                      <img className="services-card-vect-01" src="assets/images/bg/services-card-vec.png" alt="" />
                      <img className="services-card-vect-02" src="assets/images/bg/services-card-vec2.png" alt="" />
                    </div>
                    <div className="services-icon">
                      <img src="assets/images/icon/daycare3.svg" alt="" />
                    </div>
                    <div className="services-content">
                      <h3><a href="service-details.html">Daycare</a></h3>
                      <p>Pellentesque maximus augue orciquista uten aliquet risus In hac habitasse.</p>
                      <div className="more-btn">
                        <a href="shop-details.html">More Details<img src="assets/images/icon/h2-btn-arrow.svg" alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="services-card grooming-card">
                    <div className="card-vector">
                      <img className="services-card-vect-01" src="assets/images/bg/services-card-vec.png" alt="" />
                      <img className="services-card-vect-02" src="assets/images/bg/services-card-vec2.png" alt="" />
                    </div>
                    <div className="services-icon">
                      <img src="assets/images/icon/grooming3.svg" alt="" />
                    </div>
                    <div className="services-content">
                      <h3><a href="service-details.html">Grooming</a></h3>
                      <p>Pellentesque maximus augue orciquista uten aliquet risus In hac habitasse.</p>
                      <div className="more-btn">
                        <a href="service-details.html">More Details<img src="assets/images/icon/h2-btn-arrow.svg" alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="services-card boarding-card">
                    <div className="card-vector">
                      <img className="services-card-vect-01" src="assets/images/bg/services-card-vec.png" alt="" />
                      <img className="services-card-vect-02" src="assets/images/bg/services-card-vec2.png" alt="" />
                    </div>
                    <div className="services-icon">
                      <img src="assets/images/icon/bording3.svg" alt="" />
                    </div>
                    <div className="services-content">
                      <h3><a href="service-details.html">Boarding</a></h3>
                      <p>Pellentesque maximus augue orciquista uten aliquet risus In hac habitasse.</p>
                      <div className="more-btn">
                        <a href="service-details.html">More Details<img src="assets/images/icon/h2-btn-arrow.svg" alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="services-card vaterinary-card">
                    <div className="card-vector">
                      <img className="services-card-vect-01" src="assets/images/bg/services-card-vec.png" alt="" />
                      <img className="services-card-vect-02" src="assets/images/bg/services-card-vec2.png" alt="" />
                    </div>
                    <div className="services-icon">
                      <img src="assets/images/icon/vetenary3.svg" alt="" />
                    </div>
                    <div className="services-content">
                      <h3><a href="service-details.html">Vaterinary</a></h3>
                      <p>Pellentesque maximus augue orciquista uten aliquet risus In hac habitasse.</p>
                      <div className="more-btn">
                        <a href="service-details.html">More Details<img src="assets/images/icon/h2-btn-arrow.svg" alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="services-btm pt-120 mb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <div className="services-img">
                    <div className="services-img-bg">
                      <img src="assets/images/icon/h2-services-img-bg.svg" alt="" />
                    </div>
                    <img className="img-fluid" src="assets/images/bg/h2-services-img.png" alt="" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="services-content">
                    <img src="assets/images/icon/section-sl-no.svg" alt="" />
                    <h2>we are providing pet care service for years.</h2>
                    <p>Pellentesque maximus augue orci, quis congue purus iaculison id. Maecenas eu lorem quisesdoi massal molestie vulputate in sitagi amet diam. Cras eu odio sit amet ipsum cursus for that gone pellentesquea. thisaton Vestibulum ut aliquet risus. In hac habitasse plateajoa dictumst. Nuncet posuere scelerisque justo in accumsan.</p>
                    <div className="author-area">
                      <div className="author-quat">
                        <p><sup><img src="assets/images/icon/author-quat-icon.svg" alt="" /></sup> Pllentesque maximus augue orci, quis congue purus iaculisona ideno joku Maecenas eu lorem quisesdoi massal molestie jugnute vulputate in sitagajoi amet diam Cras eu odio sit amet.</p>
                      </div>
                      <div className="author-name-deg">
                        <h4>Kash Prestonal </h4>
                        <span>Founder, Scooby</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-choose-area mb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title2 text-center">
                  <h2>Why Choose Us</h2>
                  <p>Enjoy Your Holiday We Can Keep Them Happy <a href="#">Your Pet Our Priority</a> Happy Pets, Happy Humans We Are The Best Of This Country We Are Always Ready For your pet.</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center pt-90 pb-90 g-4">
              <div className="col-lg-3 col-md-4 col-sm-6 col-10">
                <div className="single-card">
                  <div className="icon">
                    <img src="assets/images/icon/care2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h4>Personalized care</h4>
                    <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-10">
                <div className="single-card">
                  <div className="icon">
                    <img src="assets/images/icon/team2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h4>Trusted Team</h4>
                    <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-10">
                <div className="single-card">
                  <div className="icon">
                    <img src="assets/images/icon/mind2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h4>Peace of mind</h4>
                    <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-10">
                <div className="single-card">
                  <div className="icon">
                    <img src="assets/images/icon/mind2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h4>Nice Environment</h4>
                    <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-area">
            <div className="container">
              <div className="row">
                <div className="swiper h2-partner">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="partner-logo">
                        <img src="assets/images/icon/partner/envato.svg" alt="" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="partner-logo">
                        <img src="assets/images/icon/partner/xidex.svg" alt="" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="partner-logo">
                        <img src="assets/images/icon/partner/arrow.svg" alt="" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="partner-logo">
                        <img src="assets/images/icon/partner/ozgeo.svg" alt="" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="partner-logo">
                        <img src="assets/images/icon/partner/avianca.svg" alt="" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="partner-logo">
                        <img src="assets/images/icon/partner/olinski.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-working-process mb-120">
          <div className="container">
            <div className="row mb-60">
              <div className="col-lg-12">
                <div className="section-title2 text-center">
                  <h2>Three Step And enjoy your day.</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="work-process-area">
                  <div className="work-process-card">
                    <div className="sl-no">
                      <span>Step</span>
                      <h3>01</h3>
                    </div>
                    <div className="icon">
                      <img src="assets/images/icon/search2.svg" alt="" />
                    </div>
                    <div className="work-content text-center">
                      <h3>Select Service</h3>
                      <p>Read verified reviews by pet owners like you and choose a sitter who’s a great match for you .</p>
                    </div>
                  </div>
                  <div className="work-proces-arrow">
                    <img className="img-fluid" src="assets/images/bg/h2-work-proces-arrow.png" alt="" />
                  </div>
                  <div className="work-process-card two">
                    <div className="sl-no">
                      <span>Step</span>
                      <h3>02</h3>
                    </div>
                    <div className="icon">
                      <img src="assets/images/icon/appoinment2.svg" alt="" />
                    </div>
                    <div className="work-content text-center">
                      <h3>Book Your Day</h3>
                      <p>Read verified reviews by pet owners like you and choose a sitter who’s a great match for you .</p>
                    </div>
                  </div>
                  <div className="work-proces-arrow">
                    <img className="img-fluid" src="assets/images/bg/h2-work-proces-arrow.png" alt="" />
                  </div>
                  <div className="work-process-card three">
                    <div className="sl-no">
                      <span>Step</span>
                      <h3>03</h3>
                    </div>
                    <div className="icon">
                      <img src="assets/images/icon/relax2.svg" alt="" />
                    </div>
                    <div className="work-content text-center">
                      <h3>Have Relax</h3>
                      <p>Read verified reviews by pet owners like you and choose a sitter who’s a great match for you .</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-contact-area mb-120">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="contact-wrap">
                      <div className="section-title">
                        <h2>Contact</h2>
                      </div>
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-inner user">
                              <input type="text" placeholder="Enter your name" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-inner email">
                              <input type="text" placeholder="Enter your email" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner querry">
                              <input type="text" placeholder="Subject" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner">
                              <textarea placeholder="Your message" defaultValue={""} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner">
                              <button className="primary-btn3" type="submit">send Now</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="contact-img">
                      <img className="img-fluid" src="assets/images/bg/h2-contact-img.png" alt="contact-img" />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="section-title">
                      <h2>FAQ</h2>
                    </div>
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            01. In et finibus lectus. Donec scelerisque tortor?
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            Pellentesque maximus augue orci, quis congue purus iaculis id. Maecenas eudocl lorem quis massal
                            molestie vulputate in sit amet diam. Cras eu odio sit amet ont tellus. Cras ut sollicitudin urna.
                            Vivamus blandit, </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            02. Rhoncus turpis porta non Curabitur interdum?
                          </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            Pellentesque maximus augue orci, quis congue purus iaculis id. Maecenas eudocl lorem quis massal
                            molestie vulputate in sit amet diam. Cras eu odio sit amet ont tellus. Cras ut sollicitudin urna.
                            Vivamus blandit, </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            03. Donec ac enim vitae ligula ultrices accum?
                          </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            Pellentesque maximus augue orci, quis congue purus iaculis id. Maecenas eudocl lorem quis massal
                            molestie vulputate in sit amet diam. Cras eu odio sit amet ont tellus. Cras ut sollicitudin urna.
                            Vivamus blandit,
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            04. Donec ac enim vitae ligula ultrices accum?
                          </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            Pellentesque maximus augue orci, quis congue purus iaculis id. Maecenas eudocl lorem quis massal
                            molestie vulputate in sit amet diam. Cras eu odio sit amet ont tellus. Cras ut sollicitudin urna.
                            Vivamus blandit,
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-testimonial-area mb-120">
          <div className="container">
            <div className="row mb-60">
              <div className="col-lg-12">
                <div className="section-title2 text-center">
                  <h2>What Our Customer Say</h2>
                </div>
              </div>
            </div>
            <div className="row mb-50">
              <div className="col-lg-12">
                <div className="client-review-area">
                  <div className="single-area">
                    <div className="icon">
                      <img src="assets/images/icon/truspilot.svg" alt="" />
                      <p>Rating</p>
                    </div>
                    <div className="review">
                      <ul>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                      </ul>
                      <span>190 reviews</span>
                    </div>
                  </div>
                  <div className="total-review">
                    <img src="assets/images/icon/total-review-star.svg" alt="" />
                    <h3>4.9</h3>
                  </div>
                  <div className="single-area">
                    <div className="icon">
                      <img src="assets/images/icon/google.svg" alt="" />
                      <p>Rating</p>
                    </div>
                    <div className="review">
                      <ul>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                        <li><i className="bi bi-star-fill" /></li>
                      </ul>
                      <span>390 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-50">
              <div className="swiper h2-testimonial-slider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-wrap">
                      <div className="testimonial-content text-center">
                        <div className="quat-icon">
                          <img className="left-quat" src="assets/images/icon/left-quat.svg" alt="" />
                          <img className="right-quat" src="assets/images/icon/right-quat.svg" alt="" />
                        </div>
                        <div className="foot-vector">
                          <img className="testimonial-vec-left" src="assets/images/icon/h2-testimonial-vec-left.svg" alt="" />
                          <img className="testimonial-vec-right" src="assets/images/icon/h2-testimonial-vec-right.svg" alt="" />
                        </div>
                        <div className="author-name-deg">
                          <h3>Sebastian Ethan</h3>
                          <span>Customer</span>
                        </div>
                        <p>Pellentesque maximus augue orci, quisdal andosp
                          Pellentesque maximus augue orci, quisoki congue
                          Nullam egestas, nisi id mollis elementum.</p>
                        <div className="review">
                          <ul>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                          </ul>
                        </div>
                      </div>
                      <div className="testimonial-img">
                        <img src="assets/images/bg/h2-testi-1.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-wrap">
                      <div className="testimonial-content text-center">
                        <div className="quat-icon">
                          <img className="left-quat" src="assets/images/icon/left-quat.svg" alt="" />
                          <img className="right-quat" src="assets/images/icon/right-quat.svg" alt="" />
                        </div>
                        <div className="foot-vector">
                          <img className="testimonial-vec-left" src="assets/images/icon/h2-testimonial-vec-left.svg" alt="" />
                          <img className="testimonial-vec-right" src="assets/images/icon/h2-testimonial-vec-right.svg" alt="" />
                        </div>
                        <div className="author-name-deg">
                          <h3>Anthony Dylan</h3>
                          <span>Customer</span>
                        </div>
                        <p>Pellentesque maximus augue orci, quisdal andosp
                          Pellentesque maximus augue orci, quisoki congue
                          Nullam egestas, nisi id mollis elementum.</p>
                        <div className="review">
                          <ul>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                          </ul>
                        </div>
                      </div>
                      <div className="testimonial-img">
                        <img src="assets/images/bg/h2-testi-2.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-between">
                <div className="slider-btn prev-btn-5">
                  <i className="bi bi-arrow-left" />
                </div>
                <div className="swiper-scrollbar" />
                <div className="slider-btn next-btn-5">
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-team-area mb-120">
          <div className="vector1">
            <img src="assets/images/bg/team/team-vector-1.png" alt="" />
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center mb-60">
              <div className="col-lg-11">
                <div className="section-title2 text-center">
                  <h2>Our best working team</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-11 justify-content-center">
                <div className="swiper h2-team-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="team-card">
                        <div className="team-card-inner">
                          <div className="card-style-1">
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-1.png" alt="" />
                            </div>
                            <div className="team-content">
                              <h3>Kash Preston</h3>
                              <span>Co-Founder</span>
                            </div>
                          </div>
                          <div className="card-style-2">
                            <div className="team-content">
                              <h3>Kash Preston</h3>
                              <span>Co-Founder</span>
                            </div>
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-1.png" alt="" />
                              <div className="social-area">
                                <div className="share-icon">
                                  <i className="bi bi-share-fill" />
                                </div>
                                <ul className="social-icons">
                                  <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                  <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                  <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                                  <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="team-card">
                        <div className="team-card-inner">
                          <div className="card-style-1">
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-2.png" alt="" />
                            </div>
                            <div className="team-content">
                              <h3>Scarlett Emily</h3>
                              <span>Kennel Assistant</span>
                            </div>
                          </div>
                          <div className="card-style-2">
                            <div className="team-content">
                              <h3>Scarlett Emily</h3>
                              <span>Kennel Assistant</span>
                            </div>
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-2.png" alt="" />
                              <div className="social-area">
                                <div className="share-icon">
                                  <i className="bi bi-share-fill" />
                                </div>
                                <ul className="social-icons">
                                  <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                  <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                  <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                                  <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="team-card">
                        <div className="team-card-inner">
                          <div className="card-style-1">
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-3.png" alt="" />
                            </div>
                            <div className="team-content">
                              <h3>Jackson Mateo</h3>
                              <span>Veterinary Assistant</span>
                            </div>
                          </div>
                          <div className="card-style-2">
                            <div className="team-content">
                              <h3>Jackson Mateo</h3>
                              <span>Veterinary Assistant</span>
                            </div>
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-3.png" alt="" />
                              <div className="social-area">
                                <div className="share-icon">
                                  <i className="bi bi-share-fill" />
                                </div>
                                <ul className="social-icons">
                                  <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                  <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                  <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                                  <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="team-card">
                        <div className="team-card-inner">
                          <div className="card-style-1">
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-4.png" alt="" />
                            </div>
                            <div className="team-content">
                              <h3>Madison Ellie</h3>
                              <span>Groomer Manager</span>
                            </div>
                          </div>
                          <div className="card-style-2">
                            <div className="team-content">
                              <h3>Madison Ellie</h3>
                              <span>Groomer Manager</span>
                            </div>
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-4.png" alt="" />
                              <div className="social-area">
                                <div className="share-icon">
                                  <i className="bi bi-share-fill" />
                                </div>
                                <ul className="social-icons">
                                  <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                  <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                  <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                                  <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="team-card">
                        <div className="team-card-inner">
                          <div className="card-style-1">
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-5.png" alt="" />
                            </div>
                            <div className="team-content">
                              <h3>Gorjona Hiller</h3>
                              <span>Daycare Manager</span>
                            </div>
                          </div>
                          <div className="card-style-2">
                            <div className="team-content">
                              <h3>Gorjona Hiller</h3>
                              <span>Daycare Manager</span>
                            </div>
                            <div className="team-img">
                              <img className="img-fluid" src="assets/images/bg/team/h2-team-5.png" alt="" />
                              <div className="social-area">
                                <div className="share-icon">
                                  <i className="bi bi-share-fill" />
                                </div>
                                <ul className="social-icons">
                                  <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                  <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                  <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
                                  <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pagination-area">
                    <div className="team-pagination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-blog-area mb-120">
          <div className="container">
            <div className="row justify-content-center mb-60">
              <div className="col-lg-11">
                <div className="section-title2 text-center">
                  <h2>Our Newest blogs</h2>
                </div>
              </div>
            </div>
            <div className="row g-lg-4 gy-5 justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-10">
                <div className="blog-card-2">
                  <div className="blog-img">
                    <img className="img-fluid" src="assets/images/blog/blog4.png" alt="blog" />
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <ul>
                        <li><a href="blog-grid.html">August 10, 2022</a></li>
                        <li><a href="blog-grid.html">Grooming</a></li>
                      </ul>
                    </div>
                    <h4><a href="blog-details.html">Donec venenatis exid nibah goramt iaculisoni or Clonal interdum.</a></h4>
                    <div className="more-btn">
                      <a href="blog-details.html"><span>Re</span>ad More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-10">
                <div className="blog-card-2">
                  <div className="blog-img">
                    <img className="img-fluid" src="assets/images/blog/blog5.png" alt="blog" />
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <ul>
                        <li><a href="blog-grid.html">August 12, 2022</a></li>
                        <li><a href="blog-grid.html">Grooming</a></li>
                      </ul>
                    </div>
                    <h4><a href="blog-details.html">Cras a mattis sapien Duis efficituroi mollis enim dictum.</a></h4>
                    <div className="more-btn">
                      <a href="blog-details.html"><span>Re</span>ad More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-10">
                <div className="blog-card-2">
                  <div className="blog-img">
                    <img className="img-fluid" src="assets/images/blog/blog6.png" alt="blog" />
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <ul>
                        <li><a href="blog-grid.html">August 14, 2022</a></li>
                        <li><a href="blog-grid.html">Grooming</a></li>
                      </ul>
                    </div>
                    <h4><a href="blog-details.html">Etiam fringilla consectetur nullaqul molestie neque volutpat.</a></h4>
                    <div className="more-btn">
                      <a href="blog-details.html"><span>Re</span>ad More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 pt-30 d-flex justify-content-center">
                <div className="view-details-btn">
                  <a className="primary-btn2 btn-lg" href="blog-grid.html">View All Blog</a>
                </div>
              </div>
            </div>
          </div>
        </div>
       <ChatBot/>
     </div>
     );
}

export default Home;