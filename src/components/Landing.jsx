import React from "react";
import "../styles/core/_landing.scss";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <header className="landing">
        <h1 className="married">Javier & Jessica</h1>

        <p className="parrafo">
          Querenos tener todos los recuerdos con cada uno de vosotros
        </p>
        <img className="image_qr" src="../images/qr-code.png" alt="QR" />
        <p className="qr">Escanea el qr</p>
        <Link to="/main">
          <button className="button_1">Comenzar</button>
        </Link>
        {/*<p className="parrafo2">
          Si no puedes escanear el qr, puedes acceder a la web desde el
          siguiente enlace:
        </p>*/}
      </header>
    </>
  );
}
export default Landing;
