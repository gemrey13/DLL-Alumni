import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tracer from './pages/Tracer'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tracer" element={<Tracer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
