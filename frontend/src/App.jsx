import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tracer, Sample, Dashboard, Analysis, Home, AlumniProfile } from './index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tracer" element={<Tracer />} />
        <Route path="/tracer/profile/:alumniId" element={<AlumniProfile />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
