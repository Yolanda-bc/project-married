import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import camera_image from "../images/camera.png";
import decoracion_image from "../images/decoracion.jpg";
import "../styles/core/_header.scss";

function Header() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "boda-javi-jessi");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsnngazeg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Falló la subida");

      navigate("/galeria");
    } catch (err) {
      console.error("Error al subir la iamgen:", err);
      alert("Error al subir la imagen");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <main className="app-container">
      <h1 className="name">Boda de Javier & Jessica</h1>
      <img className="cake" src={decoracion_image} alt="foto tarta novios" />
      <p className="text">Comparte con nosotros tus mejores momentos</p>
      <img className="camera" src={camera_image} alt="icon camera" />

      {/* Oculto */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button className="button" onClick={triggerFileInput}>
        Sube tu foto
      </button>
      <Link to="/galeria">
        <button className="button">Ver Galería</button>
      </Link>
    </main>
  );
}

export default Header;
