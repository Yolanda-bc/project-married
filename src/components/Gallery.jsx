{
  /*import React, { useEffect, useState } from "react";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://res.cloudinary.com/dsnngazeg/image/list/boda-javi-jessi.json"
        );
        const data = await res.json();
        const imageUrls = data.resources.map(
          (img) =>
            `https://res.cloudinary.com/dsnngazeg/image/upload/${img.public_id}.${img.format}`
        );
        setImages(imageUrls);
      } catch (err) {
        console.error("No se pudieron obtener las imágenes", err);
        // fallback: mostrar imágenes guardadas en localStorage
        const fallbackImages =
          JSON.parse(localStorage.getItem("uploadedImages")) || [];
        setImages(fallbackImages);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery">
      <h2>Galería de Fotos</h2>
      {images.length > 0 ? (
        <div className="gallery-grid">
          {images.map((url, index) => (
            <div key={index} className="image-card">
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

export default Gallery;*/
}
import React, { useEffect, useState } from "react";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:4000/images");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Error al cargar imágenes:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery">
      <h2>Galería de Fotos</h2>
      {images.length > 0 ? (
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img.secure_url} alt={`Foto ${idx + 1}`} />
              <a
                href={img.secure_url}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
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
