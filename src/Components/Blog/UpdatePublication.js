
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../User/profile.css'


import { addPublicationapi,getPublicationById,UpdatePublicationapi } from './api'


import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';





//bed image
//  import Clarifai from 'clarifai';
// import Clarifai from 'clarifai-browser';


// const app = new Clarifai.App({
//     apiKey: '72d791dcb27349c28782b1d9b1a08282'
//   });





//


const schema = yup.object().shape({

    titre: yup.string()
        .required()
        .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d]+$/, "titre must contain at least one letter, and no spiciness")
        .max(50, "titre cannot exceed 20 characters")
        .min(3, "titre must exceed 3 characters"),


    description: yup.string()
        .required()
        .matches(/^[^\d]+$/, "description must not contain numbers")
        .max(4000, "description cannot exceed 20 characters")
        .min(5, "description must exceed 3 characters"),

    category: yup.string()
        .required(),

    image: yup.mixed()
        .required()
        .test('fileFormat', 'The file must be in JPEG, PNG or JPG format', (value) =>
            value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
        )


});







function UpdatePublication() {



    const navigate = useNavigate();




    const { idpub } = useParams();

    const [publication, setPublication] = useState({
        titre: 'I love my cat',
        description: '',
        category: '',
        image: null,

    });




    // const [publication, setPublication] = useState([]);


    // const [content, setContent] = useState("");




    const [iduserfromlocalstorge, setiduserfromlocalstorge] = useState('');

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [containsProfanity, setContainsProfanity] = useState(false);

    const [containsProfanityTitle, setcontainsProfanityTitle] = useState(false);


    // bed image

    const [isBedImage, setIsBedImage] = useState(false);




    // 





    //

    // const [inputValue, setInputValue] = useState("");
    // const [recognition, setRecognition] = useState(null);




    //


    //

    useEffect(() => {

        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

        const iduser = userFromLocalStorage._id | userFromLocalStorage.facebookId;
        setiduserfromlocalstorge(iduser)
        console.log("iduserconnecte " + iduser)


        const PublicationDetails = async () => {
            const data = await getPublicationById(idpub)
            setPublication(data);
            //  alert(publication.titre)

        }
        PublicationDetails();







    }, []);


    //////recuperer les nouvelles valeurs de formulaire


    function onValueChange(e) {
        // setUser({ ...user, [e.target.name]: e.target.value });


        setPublication({ ...publication, [e.target.name]: e.target.value });






        // Appel à l'API PurgoMalum pour détecter les mots grossiers

        if (e.target.name === 'titre') {
            fetch(`https://www.purgomalum.com/service/containsprofanity?text=${e.target.value}`)
                .then(response => response.text())
                .then(result => {
                    if (result === 'true') {
                        // Mots grossiers détectés
                        setcontainsProfanityTitle(true);
                        notifybedwoed('bed words was detected in title!')
                    } else {
                        setcontainsProfanityTitle(false);
                    }
                });

        }







        if (formSubmitted) {
            schema
                .validateAt(e.target.name, { ...publication, [e.target.name]: e.target.value })
                .then(() => setFormErrors({ ...formErrors, [e.target.name]: undefined }))
                .catch((err) => setFormErrors({ ...formErrors, [e.target.name]: err.message }));
        }
    }



    function onDescriptionChange(content) {
        console.log("content " + content)
        setPublication({ ...publication, description: content });


        // Appel à l'API PurgoMalum pour détecter les mots grossiers
        fetch(`https://www.purgomalum.com/service/containsprofanity?text=${content}`)
            .then(response => response.text())
            .then(result => {
                if (result === 'true') {
                    // Mots grossiers détectés
                    setContainsProfanity(true);
                    notifybedwoed('bed words was detected in description!')

                } else {
                    setContainsProfanity(false);
                }
            });







        if (formSubmitted) {
            schema
                .validateAt("description", { ...publication, description: content })
                .then(() => setFormErrors({ ...formErrors, description: undefined }))
                .catch((err) => setFormErrors({ ...formErrors, description: err.message }));
        }
    }



    const onFileHandle = e => {
        setPublication({
            ...publication,
            image: e.target.files[0]
        });
    };













    ////// envoi de formulaire
    const handleSubmit = async e => {


        // const id = user._id || user.facebookId;
        e.preventDefault();
        setFormSubmitted(true);


        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

        console.log("iduserfromlocalstorge " + userFromLocalStorage._id)

        alert("m submit "+ publication.titre)


        try {
            await schema.validate(publication, { abortEarly: false })
                .then(async () => {


                    // Si aucun erreur de validation, envoyer la réponse

                    if (!containsProfanity && !containsProfanityTitle) {
                        // Envoyer la réponse


                        const formData = new FormData();
                        formData.append("titre", publication.titre);
                        formData.append("description", publication.description);
                        formData.append("category", publication.category);
                        formData.append("user", userFromLocalStorage._id);


                        formData.append("image", publication.image);


                        const res = await UpdatePublicationapi(userFromLocalStorage._id, formData,idpub)
                        notify()

                        // console.log("--> " + JSON.stringify(res.data.user));
                        // localStorage.setItem("user", res.data.user);

                        if (res.status === 200)
                            navigate("/profile");
                        console.log('Updated')

                        console.log("yyyyyyyyyyyyyyyyyyy")


                        // ...
                    } else {
                        // Mots grossiers détectés, désactiver le bouton d'envoi
                        //   alert('Attention, des mots grossiers ont été détectés dans la description !');
                        //   notifybedwoed()
                        warningNotification()

                    }

                })



















        } catch (error) {
            console.log(error);
            const newErrors = {};
            error.inner.forEach((e) => (newErrors[e.path] = e.message));
            setFormErrors(newErrors);

        }


    };













    const notify = () => toast.success(' 👤 Publication bien ajoute !', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }).then(
        window.location.reload()


    );


    const notifybedwoed = (xx) => toast.error(xx, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    function warningNotification() {
        addNotification({
            title: 'bad words',
            //   subtitle: 'Please fill it',
            message: 'there is bad words please remove it', theme: 'red',
            closeButton: "X",
            duration: 2000,
        })
    };






    return (
        <>
            <div>



                <ToastContainer />
                <Notifications />

                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                <div className="main-content">
                    {/* Top navbar */}

                    {/* Header */}
                    <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ height: "30vh", backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>

                    </div>
                    {/* Page content */}

                    <div className="container-fluid mt--7">
                        <div className="row">

                            <div class="col-2 align-self-start">
                            </div>

                            <div className="col ">

                                <div className="card bg-secondary shadow">
                                    <div className="card-header bg-white border-0">
                                        <div className="row align-items-center">
                                            <div className="col-8">
                                                <h3 className="mb-0">Update publication</h3>
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
                                            {/* <h6 className="heading-small text-muted mb-4">INFORMATIONS DE L'UTILISATEUR</h6> */}
                                            <div className="pl-lg-4">

                                                <div className="row">
                                                    <div className="">
                                                        <div className="form-group focused">



                                                            <label className="form-control-label" htmlFor="input-username">titre</label>

                                                            <input type="text" name="titre" value={publication?.titre} onChange={onValueChange} id="input-username" className="form-control form-control-alternative" placeholder="Username" />

                                                            {/* <input
                                                                type="text"
                                                                name="titre"
                                                                value={inputValue}
                                                                onChange={(event) => setInputValue(event.target.value)}
                                                                id="input-username"
                                                                className="form-control form-control-alternative"
                                                                placeholder="Username"
                                                            />
                                                            {recognition ? (
                                                                <button onClick={handleStopVoiceInput}>Arrêter la reconnaissance vocale</button>
                                                            ) : (
                                                                <button onClick={handleStartVoiceInput}>Activer la reconnaissance vocale</button>
                                                            )} */}




                                                            {formErrors.titre && <p style={{ color: 'red' }}>{formErrors.titre}</p>}


                                                        </div>
                                                    </div>
                                                    <div className="">

                                                        <div className="form-group">

                                                            <label className="form-control-label" htmlFor="input-email">description</label>


                                                            <ReactQuill theme="snow" value={publication.description} onChange={onDescriptionChange}
                                                                style={{ height: `120px` }} />




                                                            {/* <input type="text" name="description" value={publication.description} onChange={onValueChange} id="input-username" className="form-control form-control-alternative" placeholder="Username" /> */}


                                                            {formErrors.description && <p style={{ color: 'red', marginTop: '45px' }}>{formErrors.description}</p>}



                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="">
                                                        <div className="form-group focused">

                                                            <label style={{ marginTop: '45px' }} className="form-control-label" htmlFor="input-first-name">Category</label>
                                                            <select name="category" value={publication.category} onChange={onValueChange} className="form-control form-control-alternative" id="pet-select">
                                                                <option value="">--Please choose an option--</option>
                                                                <option value="Pet Grooming">Pet Grooming</option>
                                                                <option value="Medical Care">Medical Care</option>
                                                                <option value="Pet Bording">Pet Bording</option>
                                                                <option value="Pet Daycare">Pet Daycare</option>
                                                                <option value="Pet Walking">Pet Walking</option>
                                                                <option value="Education Pet">Education Pet</option>


                                                            </select>
                                                            {formErrors.category && <p style={{ color: 'red' }}>{formErrors.category}</p>}


                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="form-group focused">


                                                            <label className="form-control-label" htmlFor="input-last-name">Image</label>
                                                            <input type="file" name="image" accept="image/*" onChange={onFileHandle} id="input-last-name" className="form-control form-control-alternative" placeholder="image" />
                                                            {formErrors.image && <p style={{ color: 'red' }}>{formErrors.image}</p>}

                                                        </div>
                                                    </div>



                                                </div>







                                            </div>
                                            <div className="col-12 text-right mr-5">

                                                <button type="submit" className="btn btn-sm btn-primary">
                                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                                    &nbsp;&nbsp;
                                                    Update publication</button >

                                                 
                                            </div>
                                        </form>


                                        {/*-------------------------------------------------------------------------------------------------------------------  */}
                                        {/*-------------------------------------------------------------------------------------------------------------------  */}

                                    </div>

                                </div>
                            </div>

                            <div class="col-2 align-self-end">
                            </div>

                        </div>
                    </div>
                </div>

            </div>







        </>
    );




}

export default UpdatePublication;






