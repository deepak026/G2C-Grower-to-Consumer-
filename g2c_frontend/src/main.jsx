import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import Temp from './components/Temp/Temp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <ChakraProvider>
        <App />
        {/* <Temp /> */}
      </ChakraProvider>
    </>
  </React.StrictMode>
)
