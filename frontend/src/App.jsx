import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tracer from './pages/Tracer';
import Sample from './pages/Sample';
import CurriculumAnalysis from './pages/CurriculumAnalysis';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tracer" element={<Tracer />} />
        <Route path="/analysis" element={<CurriculumAnalysis />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
