import React from "react";

function Gallery() {
  const uploadedImages =
    JSON.parse(localStorage.getItem("uploadedImages")) || [];

  return (
    <div>
      <h2>Galería de Fotos</h2>
      {uploadedImages.length > 0 ? (
        <div>
          {uploadedImages.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Foto ${index + 1}`} />
              <a href={url} download target="_blank" rel="noopener noreferrer">
                Descargar
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay imágenes aún.</p>
      )}
    </div>
  );
}

export default Gallery;
