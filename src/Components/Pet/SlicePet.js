import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers,  addPet} from "../service/api";


export const fetchUsers = createAsyncThunk("pets/fetchUsers", async () => {
  const response = await getUsers();
  return response;
});
export const addPetc = createAsyncThunk("pets/addPetc", async (pet) => {
  const response = await addPet(pet);
  return response;
});
// export const updateAsyncThunk = createAsyncThunk(
//   "users/updateUser",
//   async (user) => {
//     const response = await update(user.id,user);
//     return response;
//   }
// );

// export const deleteUser = createAsyncThunk("users/deleteUser", async (user) => {
//   const response = await deleteUserService(user._id);
//   return response.data;
// });
// export const banUseradmin = createAsyncThunk("users/ban", async (user) => {
//   const response = await banUser(user._id);
//   return response.data;
// });

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {
   
     
  },
});

export const {  updateUsername } = userSlice.actions;
export default userSlice.reducer;
