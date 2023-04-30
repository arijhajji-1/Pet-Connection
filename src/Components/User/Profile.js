
import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { login, register, editProfil } from "./api";
import { Await} from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AwesomeNotifications } from 'awesome-notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { enable2FA } from './api';
import { disable2FA } from './api';

import './profile.css'
const schema = yup.object().shape({
  username: yup.string()
      .required()
      .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d]+$/, "Username must contain at least one letter, and no spiciness")
      .max(20, "Username cannot exceed 20 characters")
      .min(3,"Username must exceed 3 characters"),


  name: yup.string()
       .required()
       .matches(/^[^\d]+$/, "name must not contain numbers")
       .max(20, "name cannot exceed 20 characters")
       .min(3,"name must exceed 3 characters"),


  email: yup.string()
      .required()
  // .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d]+@(?:[a-zA-Z\d]+\.)+(?:com|tn)$/,'email must be in this form exp@exp.com ou exp@exp.tn')
      .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d._]+@(?:[a-zA-Z\d]+\.)+(?:com|tn)$/,'email must be in this form exp@exp.com ou exp@exp.tn'), // accepte . ou milieu


      




  location: yup.string()
       .required()
       .matches(/^[A-Z][a-zA-Z]*$/, 'location must begin with an uppercase letter and must contain only letters.')
       .max(20, "location cannot exceed 20 characters")
       .min(3,"location must exceed 3 characters"),



  phone: yup.string()
       .required()
       .matches(/^[0-9]{8}$/, 'phone field must contain 8 digits without spaces or special characters.'),
     


  image: yup.mixed()
  .required()
  .test('fileFormat', 'The file must be in JPEG, PNG or JPG format', (value) =>
    value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
  )

  });


 
 



function Profile() {

  const navigate = useNavigate();
  const param = useParams();
  const [imageSrc, setImageSrc] = useState(''); // importer image user 



  // const [user, setUser] = useState({});

  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    location: '',
    phone: '',
    image: null,
    password:''

  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);


  useEffect(() => {

    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const id = userFromLocalStorage._id|userFromLocalStorage.facebookId;
    console.log("iduserconnecte " + id)

    setUser(userFromLocalStorage);

    // setFormData({
    //   "username": userFromLocalStorage.username,
    //   "name": userFromLocalStorage.name,
    //   "email": userFromLocalStorage.email,
    //   "location": userFromLocalStorage.location,
    //   "phone": userFromLocalStorage.phone,
    //   "image": null,
    //   "password": userFromLocalStorage.password,
    // });


    //////////importer image user 
    if (userFromLocalStorage.image) {
      axios.get(`http://localhost:3000/user/imageUser/${userFromLocalStorage.id}/image`, { responseType: 'blob' })
        .then(res => {
          const url = URL.createObjectURL(res.data);
          setImageSrc(url);
          console.log("url image--->" + url)

        })
        .catch(error => {
          console.error(error);
        });
    }





    //console.log("user id ---> "+ user._id)

  }, []);


  //////recuperer les nouvelles valeurs de formulaire


  function onValueChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (formSubmitted) {
      schema
        .validateAt(e.target.name, { ...user, [e.target.name]: e.target.value })
        .then(() => setFormErrors({ ...formErrors, [e.target.name]: undefined }))
        .catch((err) => setFormErrors({ ...formErrors, [e.target.name]: err.message }));
    }
  }



  const onFileHandle = e => {
    setUser({
      ...user,
      image: e.target.files[0]
    });
  };



  // const handleFileChange = e => {
  //   setFormData({
  //     ...formData,
  //     image: e.target.files[0]
  //   });
  // };


  ////// envoi de formulaire
  const handleSubmit = async e => {
    const id = user._id||user.facebookId;
    e.preventDefault();
    setFormSubmitted(true);


    try {
      await schema.validate(user, { abortEarly: false });



      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("location", user.location);
      formData.append("phone", user.phone);
      formData.append("image", user.image);



      const res = editProfil(id, formData).then(
        notify()
      )

      console.log("--> " + JSON.stringify(res.data.user));
      localStorage.setItem("user", res.data.user);

      // if (res.status === 200)
      //   navigate("/profile");
      //   console.log('Updated')


    } catch (error) {
      console.log(error);
      const newErrors = {};
      error.inner.forEach((e) => (newErrors[e.path] = e.message));
      setFormErrors(newErrors);

    }


  };


  const notify = () => toast.success(' 👤 User is Modified !', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });


//2FA
const [qrCodeData, setQrCodeData] = useState(null);
const [secretKey, setSecretKey] = useState(null);
const [showResults, setShowResults] = useState(false);

const User = JSON.parse(localStorage.getItem("user"));
const token = User.accessToken;

const handleEnable2FA = () => {
  const id = User._id||User.facebookId;
  console.log(id)
  
  enable2FA(id)
    .then((response) => {
      const qrCode = response.data.qrCode;
      const secret = response.data.secret;
      console.log(qrCode);
      console.log(secret);
      setQrCodeData(qrCode);
      setSecretKey(secret);
      setShowResults(true);
    })
    .catch((error) => {
      console.log("khlet 2");
    });
};

const qrStyle = {
 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px',
}



const QR = () => (
  <div style={qrStyle}>
        <h4 color="Red">Please scan this Qr code and save your authentication code for your login</h4>

    <img src={qrCodeData} alt="QR Code" />
    {/* <p>secretKey: "{secretKey}"</p> */}

  </div>
);

useEffect(() => {
  if (showResults && qrCodeData) {
    console.log("qrCodeData", qrCodeData);
  }
}, [qrCodeData, showResults]);
//disable 2Fa
const Utilisateur = JSON.parse(localStorage.getItem('user'));

const handleDisable2FA = async () => {
  try {
    const id = Utilisateur._id||Utilisateur.facebookId;
    const response = await disable2FA(id);
    console.log('Two-Factor Authentication has been disabled');
    console.log('Response:', response.data);
    alert("2fa has been disabled");
    window.location.reload();
    
    // or update the state of your component to reflect the change
  } catch (error) {
    console.log('Error disabling Two-Factor Authentication:', error);
    // or display an error message to the user
  }
};





  return (
    <>
      <div>
        {/* <div>
      <button onClick={notify}>Show Notification</button>
    </div> */}


        <ToastContainer />

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <div className="main-content">
          {/* Top navbar */}
          <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
            <div className="container-fluid">
              {/* Brand */}
              {/* <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">User profile</a> */}
              {/* Form */}
              <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                <div className="form-group mb-0">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-search" /></span>
                    </div>
                    <input className="form-control" placeholder="Search" type="text" />
                  </div>
                </div>
              </form>
              {/* User */}
              <ul className="navbar-nav align-items-center d-none d-md-flex">
                <li className="nav-item dropdown">
                  <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  
                  </a>
                  <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                    <div className=" dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </div>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {/* Header */}
          <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ height: "30vh", backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10">
                  <h2 className="display-2 text-white">Hello,  {user.username}</h2>
                  <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                  <a href="#!" className="btn btn-info">Edit profile</a>
                </div>
              </div>
            </div>
          </div>
          {/* Page content */}
          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a>
                        {imageSrc !== '' ? <img src={imageSrc} alt={user.name} className="rounded-circle" /> :

<img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOGcje-B89rfsytrpDJELPk1OPGA0tXLElNx837LS&s" className="rounded-circle" />}                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    {/* <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
                      <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                    </div> */}
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Publication</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Animaux</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Commentaires</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>
                        {user.name}<span className="font-weight-light"></span>
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" /> {user.email}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />Phone number : {user.phone}

                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />User Name : {user.username}

                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />Location : {user.location}
                      </div>
                      <hr className="my-4" />
                      <a style={{ color: 'white' }}>Show more</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">Mon compte</h3>
                      </div>

                      {/*  */}
                      {/* -------------------------------------------------------------------------------------------------------------------------------- */}
                      {/* -------------------------------------------------------------------------------------------------------------------------------- */}

                      <div className="col-4 text-right">
                        {/* <a href="#!" className="btn btn-sm btn-primary">Modifier Profile</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                      <h6 className="heading-small text-muted mb-4">INFORMATIONS DE L'UTILISATEUR</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">



                              <label className="form-control-label" htmlFor="input-username">Username</label>
                              <input type="text" name="username" value={user.username} onChange={onValueChange} id="input-username" className="form-control form-control-alternative" placeholder="Username" />

                              {formErrors.username && <p>{formErrors.username}</p>}


                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">

                              <label className="form-control-label" htmlFor="input-email">Email address</label>
                              <input type="email" name="email" value={user.email} onChange={onValueChange} id="input-email" className="form-control form-control-alternative" placeholder="Email" />
                              {formErrors.email && <p>{formErrors.email}</p>}


                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">

                              <label className="form-control-label" htmlFor="input-first-name">Name</label>
                              <input type="text" name="name" value={user.name} onChange={onValueChange} id="input-first-name" className="form-control form-control-alternative" placeholder="name" />
                              {formErrors.name && <p>{formErrors.name}</p>}

                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">

                              <label className="form-control-label" htmlFor="input-last-name">Location</label>
                              <input type="text" name="location" value={user.location} onChange={onValueChange} id="input-last-name" className="form-control form-control-alternative" placeholder="Location" />
                              {formErrors.location && <p>{formErrors.location}</p>}

                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group focused">

                              <label className="form-control-label" htmlFor="input-last-name">Phone number</label>
                              <input type="text" name="phone" value={user.phone} onChange={onValueChange} id="input-last-name" className="form-control form-control-alternative" placeholder="phone number" />
                              {formErrors.phone && <p>{formErrors.phone}</p>}

                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">

                              <label className="form-control-label" htmlFor="input-last-name">Image</label>
                              <input type="file" name="image" accept="image/*" onChange={onFileHandle} id="input-last-name" className="form-control form-control-alternative" placeholder="image" />
                              {formErrors.image && <p>{formErrors.image}</p>}

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 text-right mr-5">
                     
                        <button type="submit" className="btn btn-sm btn-primary">Modifier Profile</button >
                      </div>
                    </form>
                    <button className="btn btn-sm btn-primary" onClick={handleDisable2FA}>Disable Two-Factor Authentication</button>

<button className="btn btn-sm btn-primary" onClick={handleEnable2FA}>
Enable Two factor Authentication
</button>
{showResults ? <QR /> : null}
                    {/*-------------------------------------------------------------------------------------------------------------------  */}
                    {/*-------------------------------------------------------------------------------------------------------------------  */}

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>







    </>
  );




}

export default Profile;






