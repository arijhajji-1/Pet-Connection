import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    isAuthenticated: false,
    user: null,
    qrCode: null,
    isQrCodeVerified: false
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
        case 'LOGOUT':
            return {
              ...state,
              isAuthenticated: false,
              user: null
            };
          case 'SET_QR_CODE':
            return {
              ...state,
              qrCode: action.payload.qrCode
            };
          case 'VERIFY_QR_CODE':
            return {
              ...state,
              isQrCodeVerified: true
            };
          case 'RESET_QR_CODE':
            return {
              ...state,
              qrCode: null,
              isQrCodeVerified: false
            };
            case 'CONNECT_FACEBOOK':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
            default:
              return state;
          }
        };
const store = createStore(reducer, applyMiddleware(thunk));

export default store;