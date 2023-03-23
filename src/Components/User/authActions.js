import axios from 'axios';

export const loginSuccess = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {
      user
    }
  };
};

export const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE'
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const setQRCode = (qrCode) => {
  return {
    type: 'SET_QR_CODE',
    payload: {
      qrCode
    }
  };
};

export const verifyQRCode = () => {
  return {
    type: 'VERIFY_QR_CODE'
  };
};

export const resetQRCode = () => {
  return {
    type: 'RESET_QR_CODE'
  };
};

export const facebookSuccess = ( user) =>{
    return {
        type: 'CONNECT_FACEBOOK',
        payload: {
        user
        }
    };
  };