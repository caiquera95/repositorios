import {BrowserRouter} from 'react-router-dom';
import AuthProvider from './contexts/auth';
import Routes from './routes';

import { ChakraProvider } from '@chakra-ui/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export default function App(){
  return(
    <ChakraProvider>
      <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoclose={3000}/>
          <Routes />
      </BrowserRouter>
    </AuthProvider>
    </ChakraProvider>
    
  )
}

