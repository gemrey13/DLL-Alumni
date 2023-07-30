import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tracer, Sample, Dashboard, Analysis, Home, AlumniProfile, Landing, About, News } from './index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
        </Route>
        
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
