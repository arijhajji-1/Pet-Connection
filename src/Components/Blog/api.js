import axios from "axios";
const url = "http://localhost:3000/publication/";
const urlc = "http://localhost:3000/comment";











export const getallPublication = async (userid) => {
    console.log("userid - >"+userid)

    return  await axios.get(`${url}getallpublicaion?userid=${userid}`
    ).then(response => response.data);
}



export const getallPublicationByIdUser = async (userid) => {
    console.log("userid - >"+userid)

    return  await axios.get(`${url}/getallpublicaionByUserId?userid=${userid}`
    ).then(response => response.data);
}



export const getNewestPubs = async (userid) => {
    console.log("userid - >"+userid)

    return  await axios.get(`${url}/getNewestPubs?userid=${userid}`
    ).then(response => response.data);
}






export const getPublicationById = async (idub) => {
    console.log("idpub - >"+idub)

    return  await axios.get(`${url}/getPubbyid/${idub}`)
          .then(response => response.data);
}

export const getOwnerPublication = async (idpub) => {
    console.log("idpub - >"+idpub)

    return  await axios.get(`${url}/getOwnerPublication/${idpub}`)
          .then(response => response.data);
}



export const deletePublication = async (idpub) => {
    try {
      const response = await axios.delete(`${url}/deletepublication/${idpub}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };



  export const  UpdatePublicationapi= async (userId, publication,idpub) => {

    return await axios.put(`${url}updatepublication/${idpub}`,publication)
       .then(response => response.data);


  };

// *********************************************


export const getallComments = async (idpubb) => {
    console.log("idpub - >"+idpubb)

    return  await axios.get(`http://localhost:3000/comment/getallCommnetByPublicationId/${idpubb}/allcomments`)
          .then(response => response.data);
}




export const getReplybyId = async (idrep) => {
    console.log("idpub - >"+idrep)

    return  await axios.get(`http://localhost:3000/comment/getreplyById/${idrep}/getreply`)
          .then(response => response.data);
}






export const addCommentAPI = async (userid,comment) => {
    console.log("userid - >"+userid)

    return  await axios.post(`http://localhost:3000/comment/addCommnet?userid=${userid}`,comment)
       .then(response => response.data);
}


export const getCommnetbyId = async (idcom) => {
  console.log("idpub - >"+idcom)

  return  await axios.get(`http://localhost:3000/comment/getCommnetById/${idcom}/getcomment`)
        .then(response => response.data);


}







export const addReplytoCommentAPI = async (userid,commentid,comment) => {
    console.log("userid - >"+userid)
    console.log("userid - >"+commentid)



    return  await axios.post(`http://localhost:3000/comment/replytoComment/${commentid}/reply?userid=${userid}`,comment)
       .then(response => response.data);
}



export const addPublicationapi = async (userid,publication) => {
    console.log("userid - >"+userid)
    console.log("userid - >"+publication)

    return  await axios.post(`http://localhost:3000/publication/addPublication?userid=${userid}`,publication)
       .then(response => response.data);
}


/////////vote system
export const IgnoreVoteAPI = async (pubID,userid) => {
  console.log("userid - >"+userid)
  console.log("userid - >"+pubID)

     return  await axios.delete(`http://localhost:3000/publication/${pubID}/vote/${userid}/deletevote`)
     .then(response => response.data);
}






export const addVoteAPI = async (pubId,vote) => {
  console.log("userid - >"+pubId)

  console.log("userid - >"+vote)


     return  await axios.post(`http://localhost:3000/publication/${pubId}/vote`,vote)
     .then(response => response.data);
}


//filter


export const filterOptAPI = async (titredata,catdata,votedata) => {
  console.log("titredata - >"+titredata)
  console.log("catdata - >"+catdata)
  console.log("catdata - >"+votedata)


  


  // return  await axios.get(`${url}getallpublicaion?userid=${userid}`
  // ).then(response => response.data);


  return  await axios.get(`http://localhost:3000/publication/filterOpt?category=${catdata}&titre=${titredata}&votes=${votedata}`
  ).then(response => response.data);



}
