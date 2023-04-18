import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './comment';
const rootReducer = combineReducers({
    counter: counterReducer,
    });
    
export default rootReducer;
    