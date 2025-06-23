import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/core/_header.scss";

function Header() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Selecciona una imagen");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "boda-javi-jessi");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsnngazeg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      const existingImages =
        JSON.parse(localStorage.getItem("uploadedImages")) || [];
      existingImages.push(data.secure_url);
      localStorage.setItem("uploadedImages", JSON.stringify(existingImages));

      navigate("/imagen");
    } catch (err) {
      console.error("Error al subir imagen:", err);
      alert("Error al subir la imagen");
    }
  };

  return (
    <main className="app-container">
      <h1 className="name">Boda de Javier & Jessica</h1>
      <img
        className="cake"
        src="../images/decoracion.jpg"
        alt="foto tarta novios"
      />
      <p className="text">Comparte con nosotros tus mejores momentos</p>
      <img className="camera" src="../images/camera.png" alt="icon camera" />

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button className="button" onClick={handleUpload}>
        Sube tu foto
      </button>
      <Link to="/galeria">
        <button className="button">Ver Galería</button>
      </Link>
    </main>
  );
}

export default Header;
