import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
// import { getallComments} from "../../service/api"
export const counterSlice = createSlice({
  name: 'comment',
  initialState: {
    value: []
  },
  reducers: {

    setComment:(state,action)=>{
        state.comment=action.payload;
    },
    addcomment: async (state, action) => {
       const newComment=action.payload;
       state.comment.push(newComment)
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
 
// export const fetchProducts = createAsyncThunk("users/fetchUsers", async () => {
//     const response = await getallComments();
//     return response;
//   });
export const { addcomment, decrement,populateProducts } = counterSlice.actions;
export default counterSlice.reducer;
