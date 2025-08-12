import React from "react";
import qr_image from "../images/qr-code.png";

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
        <p className="qr">Escanea el qr</p>
        <Link to="/main">
          <button className="button_1">Comenzar</button>
        </Link>
      </header>
    </>
  );
}
export default Landing;
