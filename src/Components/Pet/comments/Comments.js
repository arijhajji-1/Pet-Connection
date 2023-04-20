import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

const Comments = ({ commentsUrl, currentUserId }) => {
  const [showForm, setShowForm] = useState(false);

  const handleReplyClick = () => {
    setShowForm(true);
  };
  const handleFormSubmit = (comment) => {
    // Handle submitting the comment
    setShowForm(false); // Hide the form after submitting
  };
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
   



    const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments
  .filter(
    (backendComment) => backendComment.parentId === id
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment._id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (

    
    <div >
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
                            {showForm ? (
        <CommentForm submitLabel={id} handleSubmit={addComment}  />
      ) : (
        <div className="replay-btn" onClick={handleReplyClick}>
          <button>
            <img src="/assets/images/icon/replay-icon.svg" alt="" /> Reply
          </button>
        </div>
      )}
                            <div className="comment-area">
                                <div className="blog-comments mb-120">
                                    <div className="comments-title">
                                        <h2>Comments</h2>
                                    </div>
                                    <ul className="comment-list">
                                    {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
                                    </ul>
                                </div>
                            
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
       
    </div>
  );
};

export default Comments;
