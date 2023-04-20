import React, { useEffect, useState } from "react";

import axios from "axios";

import { getReplybyId } from "./api";
import moment from 'moment'; //pour la mise en forme du date 

import './detailsPublication.css';





function ReplyComponent({ replyId }) {


  const [replyContent, setReplyContent] = useState({});
  
  const [imageSrc, setImageSrc] = useState(''); // importer image user 


  const [userInfo, setUserInfo] = useState({}); // importer image user 


  useEffect( () => {

    getReplybyId(replyId)
      .then(async data => {
        setReplyContent(data);




    //********get user info */

    await axios.get(`http://localhost:3000/user/userInfo/${data.user}/userInfo`)
    .then(res => {
      setUserInfo(res.data);
      console.log("userinfo--->" + res)

    })
    .catch(error => {
      console.error(error);
    });

           //********get user image */


        axios.get(`http://localhost:3000/user/imageUser/${data.user}/image`, { responseType: 'blob' })
          .then(res => {
            const url = URL.createObjectURL(res.data);
            setImageSrc(url);
            console.log("url image--->" + url)
  
          })
          .catch(error => {
            console.error(error);
          });


       








      })
      .catch(error => console.log(error));







   



  }, [replyId]);



     // pour la traitement des balises html

     const createMarkup = (htmlContent) => {
      return { __html: htmlContent };
};




  return (
    // <div>{replyContent}</div>

    <div  style={{ marginBottom: '32px' }} className="single-comment d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
      <div className="comment-content">
        <div className="c-header d-flex align-items-center justify-content-between">
          <div className="author-area">
            <div className="author-img">
              {/* <img src="../assets/images/blog/blog-author1.png" alt="" /> */}
              <img   className="rounded-circle" src={ imageSrc } alt="" />

              
            </div>
            <div className="author-details">
              <h5 className="mb-0">{userInfo.name}</h5>
              <div className="c-date">{moment(replyContent.createdAt).format('DD MMMM, YYYY [At] hh.mm')}</div>
            </div>
          </div>
          {/* <div className="replay-btn">
            <a href="#"><img src="../assets/images/icon/replay-icon.svg" alt="" /> Reply</a>
          </div> */}
        </div>
        <div className="c-body">
          {/* <p>Pellentesque maximus augue orci, quis congue purus iaculison
                              id. Maecenas eu lorem quisesdoi massal molestie vulputate in
                              sitagi amet diam. Cras eu odio sit amet ipsum cursus for
                              that gone pellentesquea. thisaton Vestibulum ut aliquet
                              risus. In hac habitasse plateajoa dictumst. Nuncet posuere
                              scelerisque justo in accumsan.Pellentesque</p> */}
          {/* <p>{replyContent.text}</p> */}

          <p dangerouslySetInnerHTML={createMarkup(replyContent.text)}></p>


        </div>
      </div>
    </div>




  );
}

export default ReplyComponent;










// // Component for displaying a single comment and its replies
// function SingleComment({ comment }) {
//   const [showReplies, setShowReplies] = useState(false);

//   const handleShowReplies = () => {
//     setShowReplies(!showReplies);
//   }

//   return (
//     <div>
//       <div>{comment.text}</div>
//       <button onClick={handleShowReplies}>Show replies</button>
//       {showReplies && (
//         <ul>
//           {comment.replies.map(replyId => (
//             <li key={replyId}>
//               <ApiCallToGetReplyContent replyId={replyId} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
