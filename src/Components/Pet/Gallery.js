import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Gallery() {
    // const [images, setImages] = useState([]);
    // const [pets, setPets] = useState([]);
    // const [name, setName] = useState('');
    // const [color, setColor] = useState('');
    // const [type, setType] = useState('');
    // const userFromLocalStorageString = localStorage.getItem('user');
    // const user1 = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const userFromLocalStorageString = localStorage.getItem('user');
    const user1 = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    useEffect(() => {

        console.log(user1);
        axios.post('http://127.0.0.1:3000/pet/AllpetsByUser/', { user1 })
            .then(response => {
                
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (<div>
        <div className="gallery-img-area">
            <div className="swiper gallery-1">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-11.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-1.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-22.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-2.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-33.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-3.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-44.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-4.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-55.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-5.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-66.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-6.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-77.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-7.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-88.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-8.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="swiper-slide">
                        <a href="/assets/images/bg/gallery/gallery-99.png" data-fancybox="gallery" className="gallery2-img">
                            <div className="gallery-img">
                                <img className="img-fluid" src="/assets/images/bg/gallery/gallery-9.png" alt="" />
                                <div className="overlay">
                                    <div className="zoom-icon">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>


    </div>);
}

export default Gallery;