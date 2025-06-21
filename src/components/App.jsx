import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Header from "./Header";
import BackgroundMusic from "./BackgroundMusic";

function App() {
  return (
    <>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Header />} />
      </Routes>
    </>
  );
}

export default App;
