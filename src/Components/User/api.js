import axios from "axios";
const url = "http://localhost:3000/user";

export const login = async (user) => {
  return  await axios.post(`${url}/login`, user).then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
  });
};

export const register = async (user) => {
  return await axios.post(`${url}/register`, user);
};

export const enable2FA = async (id) => {
    // const userString = localStorage.getItem("user");
    // if (!userString) {
    //   throw new Error("User not found in localStorage");
    // }
    //  let user;
    // try {
    //   user = JSON.parse(userString);
    // } catch (error) {
    //   throw new Error("Invalid user data in localStorage");
    // }
    // const token = user.token;
    // const headers = { Authorization: `Bearer ${token}` };
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvbCIsImlkIjoiNjQwYjUwZTNjYzVhNjJlMWZiZmRmNmJiIiwiaWF0IjoxNjc4NDcyMDU4fQ.rt1aYUcEmktPpJ9zeCe3Felr4ETMWXrC-Ow5S0cF3I8; connect.sid=s%3AJJIg855fMw3SDNdaxrTi6ndarAGKyoCF.xtxsJove%2FvlVbEEFkvTb2%2B8Wv7fUWYIgPErkoeKXz2g";
    
    // const headers = { Authorization: `Bearer ${accessToken }` };
    return await axios.post(`${url}/2fa/enable/${id}`);
  };


export const disable2FA = async (id) => {
//   const token = JSON.parse(localStorage.getItem("user")).token;
//   const headers = { Authorization: `Bearer ${token}` };
  return await axios.post(`${url}/2fa/disable/${id}`);
};

export const verify2FA = async (id, token) => {
  try {
    const response = await axios.post(`${url}/2fa/verify/${id}`, { token });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

  
export const facebook = async() =>
{
    return await axios.post(`${url}/facebook`);
}

export const loginGoogle = async (user) => {
  return axios.post(`${url}/loginGoogle`, user).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
  });
  
  
};

export const editProfil = async (id, xx) => {

  //const accessToken = localStorage.getItem("access-token");
  return await axios.put(`${url}/updateuser/${id}`,xx).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
  }) ;

}

export const forgetPwd = async (email) => {
  return await axios.post(`${url}/forget-password-token`, { email });
};
export const resetPassword = async (token, password) => {
  const endpoint = `${url}/resetpassword`;
  const data = { token, password };
  const response = await axios.post(endpoint, data);
  return response.data;
};




///////////////////face rec///////////////////

export const faceRecognition = async () => {
  console.log("test" + "faaaace"); 

  try {
      // await axios.post(`http://localhost:3000/user/detect2`);

      const response = await axios.post('http://localhost:3000/user/detect2');
      // alert(response.data); // Affiche la réponse de l'API dans la console
      return response.data; // Retourne la réponse de l'API

      
  } catch (error) {
      console.log(error); 
  }
  
};




export const loginFaceRecognitionAPI = async (userid) => {
//  alert("userid - >"+userid)

  return  await axios.post(`http://localhost:3000/user/loginFaceRecognition?userid=${userid}`,userid).then((response) => {

    // alert("response :  - >"+response.data)

    localStorage.setItem("user", JSON.stringify(response.data));
  });
  


}


export const addImageFlaskAPI = async (imagedata) => {
  console.log("image added flask")
  return axios.post(`http://127.0.0.1:5000/add_profile_image`, imagedata);
};




