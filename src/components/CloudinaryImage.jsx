import React from "react";

const CloudinaryImage = () => {
  const imageUrl = localStorage.getItem("uploadedImage");

  if (!imageUrl) {
    return <p>No hay ninguna imagen cargada aún.</p>;
  }

  return (
    <div>
      <h2>Imagen subida a Cloudinary</h2>
      <img src={imageUrl} alt="Imagen subida" />
      <a href={imageUrl} download target="_blank" rel="noopener noreferrer">
        <button>Descargar imagen</button>
      </a>
    </div>
  );
};

export default CloudinaryImage;
