import axios from "axios";

const url = "http://127.0.0.1:3000/pet/AllpetsByUser/";
 const url2 = "http://127.0.0.1:3000/pet/addpetwithUser";
 const comments1 = "http://127.0.0.1:3000/pet/comments";

// // const url4 = "http://localhost:3000/user/ban";
// // const url5 = "http://localhost:3000/user/update";
export const getallComments = async () => {
  try {
    const response = await axios.get(comments1);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
//add USer

export const addPet = async (pet) => {
    try {
      const response = await axios.post(url2, pet
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
 
  //add with images 
  // export const deleteUser = async (id) => {
  //   try {
  //     const response = await axios.delete(`${url3}/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // export const banUser = async (id) => {
  //   try {
  //     const response = await axios.post(`${url4}/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // export const update = async (id,user) => {
  //   try {
  //     const response = await axios.put(`${url5}/${id}`,user);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };