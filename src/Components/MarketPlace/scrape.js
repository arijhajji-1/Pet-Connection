import axios from "axios";
import { useEffect, useState } from "react"
import Loading from "../Pages/Loading";

export default function Woah(){
    const [data,setdata]=useState(null);
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/scrap/getInformation').then(
            (result)=>setdata(shuffleArray(result.data))
        )

    },[])
    function randomdata(){
        setdata(null);
        axios.get('http://localhost:3000/scrap/getInformation').then(
            (result)=>setdata(shuffleArray(result.data))
        )  
    }

    return(
        <>
        
        
        <div className="inner-page-banner">
        <div className="breadcrumb-vec-btm">
          <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-6 align-items-center">
              <div className="banner-content">
                <h1>World Organisation for Animal Health</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Shop</li>
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
      <div className="shop-page pt-120 mb-120">
      <div className="container">
                      <div className="d-flex flex-wrap justify-content-between">
            {data&&
            data.slice(0,6).map((d,index)=>
            <div class="card col-3 mb-4 me-1 " style={{"width": "18rem;"}}>
            <img class="card-img-top" src={d.imgSrc} alt="Card image cap"/>
            <div class="card-body">
                <a href={d.link} target="_blank">
              <h5 class="card-title">{d.title}</h5>
              </a>
              <p class="card-text">{d.date}</p>
              <p class="card-text">{d.abstract}</p>
            </div>
          </div>)
          
          }
          {!data&&
          <Loading/>}
          
            </div>
            <div className="row">
            <button className="account-btn" onClick={randomdata}>
                        {" "}
                        <i className="fa fa-paw" aria-hidden="true" ></i>
                        &nbsp;Random
                      </button>
          </div>
            
            </div>
         </div>
        </>
    )
}