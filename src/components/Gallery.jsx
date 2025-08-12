import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/core/_gallery.scss";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [apiBase, setApiBase] = useState("/api");

  useEffect(() => {
    fetchImages();
    fetchStats();
  }, []);

  const determineApiBase = async () => {
    // Intenta primero serverless en el mismo dominio (/api). Si falla, usa backend local
    try {
      const healthRes = await fetch(`/api/health`, { cache: "no-store" });
      if (healthRes.ok) {
        setApiBase("/api");
        return "/api";
      }
    } catch (_) {
      // Ignorar y probar localhost
    }

    try {
      const localHealth = await fetch("http://localhost:4000/health", {
        cache: "no-store",
      });
      if (localHealth.ok) {
        setApiBase("http://localhost:4000");
        return "http://localhost:4000";
      }
    } catch (_) {
      // No disponible
    }

    return null;
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const base = await determineApiBase();
      if (!base) throw new Error("El servidor no está disponible");

      // Obtener las imágenes desde el base detectado
      const res = await fetch(`${base}/images`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }

      const data = await res.json();
      setImages(data);

      console.log(`✅ Cargadas ${data.length} imágenes de la boda`);
    } catch (err) {
      console.error("❌ Error al cargar imágenes:", err);
      setError(err.message);

      // Fallback: intentar cargar desde el método alternativo comentado
      console.log("🔄 Intentando método alternativo...");
      await fetchImagesAlternative();
    } finally {
      setLoading(false);
    }
  };

  // Método alternativo para cargar imágenes directamente desde Cloudinary
  const fetchImagesAlternative = async () => {
    try {
      const res = await fetch(
        "https://res.cloudinary.com/dsnngazeg/image/list/boda-javi-jessi.json"
      );
      const data = await res.json();

      if (data.resources) {
        const imageUrls = data.resources.map((img) => ({
          secure_url: `https://res.cloudinary.com/dsnngazeg/image/upload/${img.public_id}.${img.format}`,
          public_id: img.public_id,
          format: img.format,
          created_at: img.created_at,
          // Crear thumbnail optimizado
          thumbnail_url: `https://res.cloudinary.com/dsnngazeg/image/upload/w_300,h_300,c_fill,q_auto,f_auto/${img.public_id}.${img.format}`,
        }));

        setImages(imageUrls);
        setError(null);
        console.log("✅ Imágenes cargadas con método alternativo");
      }
    } catch (altErr) {
      console.error("❌ Error en método alternativo:", altErr);
      setError(
        "No se pudieron cargar las imágenes. Verifica tu conexión a internet."
      );
    }
  };

  const fetchStats = async () => {
    try {
      const base = await determineApiBase();
      if (!base) return;
      const res = await fetch(`${base}/stats`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      // No es crítico si no se pueden cargar las estadísticas
      console.log("ℹ️ No se pudieron cargar las estadísticas");
    }
  };

  const retryLoad = () => {
    setError(null);
    fetchImages();
  };

  if (loading) {
    return (
      <div className="gallery">
        <div className="gallery-header">
          <h2>Galería de Fotos</h2>
          <Link to="/main" className="back-link">
            ← Volver a subir fotos
          </Link>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando las hermosas fotos de la boda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery">
        <div className="gallery-header">
          <h2>Galería de Fotos</h2>
          <Link to="/main" className="back-link">
            ← Volver a subir fotos
          </Link>
        </div>
        <div className="error-container">
          <h3>😔 Oops! Algo salió mal</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={retryLoad}>
            🔄 Intentar de nuevo
          </button>
          <div className="error-help">
            <p>
              <strong>Posibles soluciones:</strong>
            </p>
            <ul>
              <li>
                Asegúrate de que el servidor esté ejecutándose en puerto 4000
              </li>
              <li>Verifica tu conexión a internet</li>
              <li>Contacta al administrador si el problema persiste</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h2>Galería de Fotos de Javier & Jessica</h2>
        <Link to="/main" className="back-link">
          ← Volver a subir fotos
        </Link>

        {stats && (
          <div className="gallery-stats">
            <span>📸 {images.length} fotos compartidas</span>
            <span>💕 Recuerdos únicos de vuestra boda</span>
          </div>
        )}
      </div>

      {images.length > 0 ? (
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={img.public_id || idx} className="image-card">
              <img
                src={img.thumbnail_url || img.secure_url}
                alt={`Foto de la boda ${idx + 1}`}
                loading="lazy"
                onError={(e) => {
                  // Fallback si el thumbnail falla
                  e.target.src = img.secure_url;
                }}
              />
              <div className="image-overlay">
                <a
                  href={img.secure_url}
                  download={`boda-javier-jessica-${idx + 1}.${
                    img.format || "jpg"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  📥 Descargar
                </a>
                <a
                  href={img.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-link"
                >
                  🔍 Ver completa
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-gallery">
          <h3>📸 Aún no hay fotos</h3>
          <p>¡Sé el primero en compartir un momento especial de la boda!</p>
          <Link to="/main">
            <button className="upload-first-button">Subir primera foto</button>
          </Link>
        </div>
      )}

      <div className="gallery-footer">
        <p>💝 Gracias por compartir estos momentos especiales con nosotros</p>
      </div>
    </div>
  );
}

export default Gallery;
