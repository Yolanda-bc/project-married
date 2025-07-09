import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import camera_image from "../images/camera.png";
import decoracion_image from "../images/decoracion.jpg";
import "../styles/core/_header.scss";

function Header() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Validar archivo antes de subir
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Por favor, sube solo imágenes (JPG, PNG, GIF o WebP)");
      return false;
    }

    if (file.size > maxSize) {
      alert("La imagen es demasiado grande. Máximo 10MB");
      return false;
    }

    return true;
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar archivo
    if (!validateFile(file)) {
      // Limpiar el input para que el usuario pueda seleccionar otro archivo
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "boda-javi-jessi");
    formData.append("tags", "boda-javi-jessi"); // Agregar tag para consistencia

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsnngazeg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "Error al subir la imagen");
      }

      const result = await res.json();
      console.log("Imagen subida exitosamente:", result.secure_url);

      // Simular progreso para mejor UX
      setUploadProgress(100);

      // Pequeña pausa para mostrar el éxito antes de navegar
      setTimeout(() => {
        navigate("/galeria");
      }, 1000);
    } catch (err) {
      console.error("Error al subir la imagen:", err);
      alert(`Error al subir la imagen: ${err.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }

    // Limpiar el input para permitir subir el mismo archivo de nuevo si es necesario
    e.target.value = "";
  };

  const triggerFileInput = () => {
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="app-container">
      <h1 className="name">Boda de Javier & Jessica</h1>
      <img className="cake" src={decoracion_image} alt="foto tarta novios" />
      <p className="text">Comparte con nosotros tus mejores momentos</p>
      <img className="camera" src={camera_image} alt="icon camera" />

      {/* Input oculto para seleccionar archivos */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
        disabled={isUploading}
      />

      {/* Botón de subir con estado de carga */}
      <button
        className={`button ${isUploading ? "uploading" : ""}`}
        onClick={triggerFileInput}
        disabled={isUploading}
      >
        {isUploading ? "Subiendo..." : "Sube tu foto"}
      </button>

      {/* Barra de progreso */}
      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">Subiendo tu foto... {uploadProgress}%</p>
        </div>
      )}

      <Link to="/galeria">
        <button className="button">Ver Galería</button>
      </Link>
    </main>
  );
}

export default Header;
