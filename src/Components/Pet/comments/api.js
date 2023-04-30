import axios from "axios";

const url = "http://127.0.0.1:3000/pet/AllpetsByUser/";
 const addComment1 = "http://127.0.0.1:3000/pet/addcomments";
 const comments1 = "http://127.0.0.1:3000/pet/comments";
 const userFromLocalStorageString = localStorage.getItem('user');
 const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
// // const url4 = "http://localhost:3000/user/ban";
// // const url5 = "http://localhost:3000/user/update";
export const getComments = async () => {
  try {
    
    const response = await axios.get(comments1);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
 
export const createComment = async (text, parentId ) => {
  try {
    const response = await axios.post(addComment1, {
      body: text,
      id:"111",
      parentId,
      userId: user._id,
      username: user.username,
      createdAt: new Date().toISOString(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async (id) => {
  try {
    console.log(id)
    const response = await axios.delete(`http://127.0.0.1:3000/pet/deletelost/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}; 
