import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyle from './pages/styles/global';


export default function App(){
  return(
    <>
    <GlobalStyle />
    <ToastContainer />
    <Routes />
    </>
  );
}
