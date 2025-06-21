import React from "react";

import "../styles/core/_header.scss";

function Header() {
  return (
    <>
      <main className="app-container">
        <h1 className="name">Boda de Javier & Jessica</h1>
        <img
          className="cake"
          src="../images/decoracion.jpg"
          alt="foto tarta novios"
        />
        <p className="text">Comparte con nosotros tus mejores momentos</p>
        <img className="camera" src="../images/camera.png" alt="icon camera" />
        <button className="button">Sube tu foto</button>
      </main>
    </>
  );
}
export default Header;
