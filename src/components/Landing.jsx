import React from "react";
import qr_image from "../images/qr-code-2.png";

import "../styles/core/_landing.scss";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <header className="landing">
        <h1 className="married">Javier & Jessica</h1>

        <p className="parrafo">
          Queremos tener todos los recuerdos con cada uno de vosotros
        </p>
        <img className="image_qr" src={qr_image} alt="QR" />
        <p className="qr">
          Escanea el qr o inicia desde tu ordenador a traves de la página:
        </p>
        <p className="url">https://project-married-three.vercel.app</p>
        <Link to="/main">
          <button className="button_1">Comenzar</button>
        </Link>
      </header>
    </>
  );
}
export default Landing;
