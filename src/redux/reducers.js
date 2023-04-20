import {combineReducers} from "redux";
import productSlice from "./slices/ProductSlice";
import cartSlice from "./slices/cartSlice";
import usersSlice from "../store";
const reducers =combineReducers({productSlice,usersSlice,cartSlice});

export default reducers;
