import {configureStore} from "@reduxjs/toolkit";
import reducers from "./reducers";
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";
export default configureStore({
    reducer: reducers,
},applyMiddleware(thunk))
