import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
function Market() {
    return (<>  
    <div className="inner-page-banner">
    <div className="breadcrumb-vec-btm">
      <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
    </div>
    <div className="container">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-lg-6 align-items-center">
          <div className="banner-content">
            <h1>Shop</h1>
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
      <div className="row">
        <div className="col-lg-3">
          <div className="shop-sidebar">
           {/* -------------------------Tri------------------------- */}
            <div className="shop-widget">
              <div className="check-box-item">
                <h5 className="shop-widget-title">Category</h5>
                <div className="checkbox-container">
                  <label className="containerss">Food Toppers
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="containerss">Milk Replacers
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="containerss">Canned Food
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="containerss">Veterinary Authorized Diets
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="containerss">Bones &amp; Rawhide
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
 {/* ---------------------------------------------------------------------------------- */}

        <div className="col-lg-9">
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="multiselect-bar">
                <h6>shop</h6>
                <div className="multiselect-area">
                  <div className="single-select">
                    <span>Show</span>
                    <select className="defult-select-drowpown" id="color-dropdown">
                      <option selected value={0}>12</option>
                      <option value={1}>15</option>
                      <option value={2}>18</option>
                      <option value={3}>21</option>
                      <option value={4}>25</option>
                    </select>
                  </div>
                  <div className="single-select two">
                    <select className="defult-select-drowpown" id="eyes-dropdown">
                      <option selected value={0}>Default</option>
                      <option value={1}>Grid</option>
                      <option value={2}>Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="collection-card">
                <div className="offer-card">
                  <span>Offer</span>
                </div>
                <div className="collection-img">
                  <img className="img-gluid" src="assets/images/bg/category/h3-collection-01.png" alt="" />
                  <div className="view-dt-btn">
                    <div className="plus-icon">
                      <i className="bi bi-plus" />
                    </div>
                    
                    <NavLink to="/details">View Details</NavLink>
                  </div>
                  <ul className="cart-icon-list">
                  <li><NavLink to="/cart"><img src="assets/images/icon/Icon-cart3.svg" alt=""/></NavLink></li>
                    <li><a href="#"><img src="assets/images/icon/Icon-favorites3.svg" alt="" /></a></li>
                  </ul>
                </div>
                <div className="collection-content text-center">
                  <h4><NavLink to="/details">Whiskas Cat Food Core Tuna</NavLink></h4>
                  <div className="price">
                    <h6>$25.00</h6>
                    <del>$30.00</del>
                  </div>
                  <div className="review">
                    <ul>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                    </ul>
                    <span>(50)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="collection-card">
                <div className="collection-img">
                  <img className="img-gluid" src="assets/images/bg/category/h3-collection-02.png" alt="" />
                  <div className="view-dt-btn">
                    <div className="plus-icon">
                      <i className="bi bi-plus" />
                    </div>
                    <NavLink to="/details">View Details</NavLink>
                  </div>
                  <ul className="cart-icon-list">
                    <li><NavLink to="/cart"><img src="assets/images/icon/Icon-cart3.svg" alt=""/></NavLink></li>
                    <li><a href="#"><img src="assets/images/icon/Icon-favorites3.svg" alt="" /></a></li>
                  </ul>
                </div>
                <div className="collection-content text-center">
                  <h4><NavLink to="/details">Friskies Kitten Discoveries.</NavLink></h4>
                  <div className="price">
                    <h6>$39.00</h6>
                    <del>$39.00</del>
                  </div>
                  <div className="review">
                    <ul>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                    </ul>
                    <span>(50)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="collection-card">
                <div className="offer-card sale">
                  <span>Hot Sale</span>
                </div>
                <div className="collection-img">
                  <img className="img-gluid" src="assets/images/bg/category/h3-collection-03.png" alt="" />
                  <div className="view-dt-btn">
                    <div className="plus-icon">
                      <i className="bi bi-plus" />
                    </div>
                    <NavLink to="/details">View Details</NavLink>
                  </div>
                  <ul className="cart-icon-list">
                    <li><NavLink to="/cart"><img src="assets/images/icon/Icon-cart3.svg" alt=""/></NavLink></li>
                    <li><a href="#"><img src="assets/images/icon/Icon-favorites3.svg" alt="" /></a></li>
                  </ul>
                </div>
                <div className="collection-content text-center">
                  <h4><NavLink to="/details">Joules Cat Cotton House.</NavLink></h4>
                  <div className="price">
                    <h6>$150.00</h6>
                    <del>$200.00</del>
                  </div>
                  <div className="review">
                    <ul>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                      <li><i className="bi bi-star-fill" /></li>
                    </ul>
                    <span>(50)</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          <div className="row pt-70">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="paginations-area">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-left-short" /></a></li>
                    <li className="page-item active"><a className="page-link" href="#">01</a></li>
                    <li className="page-item"><a className="page-link" href="#">02</a></li>
                    <li className="page-item"><a className="page-link" href="#">03</a></li>
                    <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-right-short" /></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>  );
}

export default Market;