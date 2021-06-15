import React from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css';

import Links from './components/Links';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="container p-4">
      <div className="row">
        <Links></Links>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;

