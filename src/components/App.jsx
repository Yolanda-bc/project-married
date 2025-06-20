import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Header from "./Header";
import BackgroundMusic from "./BackgroundMusic";

function App() {
  return (
    <>
      <Router>
        <BackgroundMusic />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Header />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
