import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Header from "./Header";
import BackgroundMusic from "./BackgroundMusic";
import Gallery from "./Gallery";

function App() {
  return (
    <>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Header />} />
        <Route path="/galeria" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
