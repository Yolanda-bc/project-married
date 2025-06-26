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
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import "../styles/core/_header.scss";

const cld = new Cloudinary({ cloud: { cloudName: "dsnngazeg" } });

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://res.cloudinary.com/dsnngazeg/image/list/boda-javi-jessi.json"
        );
        const data = await res.json();
        setImages(data.resources);
      } catch (e) {
        console.error("No se pudo cargar la galería", e);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="gallery">
      {images.map((img, idx) => {
        const cloudImg = cld
          .image(img.public_id)
          .format("auto")
          .quality("auto");
        return (
          <AdvancedImage key={idx} cldImg={cloudImg} alt={`Foto ${idx}`} />
        );
      })}
    </div>
  );
}
export default Gallery;
