import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tracer, Sample, Dashboard, Analysis, Home, AlumniProfile } from './index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Tracer" element={<Tracer />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/alumni/profile/" element={<AlumniProfile />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
