import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tracer from './pages/Tracer';
import Sample from './pages/Sample';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Tracer" element={<Tracer />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
