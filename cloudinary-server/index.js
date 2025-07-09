const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// Cargar variables de entorno
dotenv.config();

console.log("🔍 Verificando variables de entorno...");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log(
  "CLOUDINARY_API_KEY:",
  process.env.CLOUDINARY_API_KEY ? "***PROVIDED***" : "MISSING"
);
console.log(
  "CLOUDINARY_API_SECRET:",
  process.env.CLOUDINARY_API_SECRET ? "***PROVIDED***" : "MISSING"
);

// Verificar que las variables de entorno estén configuradas
const requiredEnvVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
  console.error("❌ Error: Faltan las siguientes variables de entorno:");
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  console.error(
    "\n📋 Por favor, crea un archivo .env con las credenciales de Cloudinary."
  );
  console.error("   Consulta el README.md para más información.");
  process.exit(1);
}

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verificar conexión con Cloudinary
cloudinary.api
  .ping()
  .then(() => {
    console.log("✅ Conexión con Cloudinary establecida correctamente");
  })
  .catch((error) => {
    console.error("❌ Error conectando con Cloudinary:");
    console.error("   Mensaje:", error.message);
    console.error("   Código:", error.http_code);
    console.error("   Detalles:", error);
    console.error(
      "\n💡 Verifica que tus credenciales de Cloudinary sean correctas en el archivo .env"
    );
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint de salud
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor de Cloudinary funcionando correctamente",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

// Obtener todas las imágenes de la boda
app.get("/images", async (req, res) => {
  try {
    console.log("🔍 Buscando imágenes de la boda...");

    const result = await cloudinary.search
      .expression("tags:boda-javi-jessi AND resource_type:image")
      .sort_by("created_at", "desc")
      .max_results(50) // Aumentar el límite
      .execute();

    console.log(`📸 Encontradas ${result.resources.length} imágenes`);

    // Agregar información adicional útil
    const imagesWithInfo = result.resources.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
      url: img.url,
      format: img.format,
      width: img.width,
      height: img.height,
      bytes: img.bytes,
      created_at: img.created_at,
      // URL optimizada para thumbnails
      thumbnail_url: cloudinary.url(img.public_id, {
        width: 300,
        height: 300,
        crop: "fill",
        quality: "auto",
        format: "auto",
      }),
    }));

    res.json(imagesWithInfo);
  } catch (error) {
    console.error("❌ Error al obtener imágenes:", error);
    res.status(500).json({
      error: "Error al obtener imágenes",
      message: error.message,
    });
  }
});

// Obtener estadísticas de la galería
app.get("/stats", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("tags:boda-javi-jessi AND resource_type:image")
      .aggregate("resource_type")
      .execute();

    res.json({
      total_images: result.total_count,
      last_updated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Error al obtener estadísticas:", error);
    res.status(500).json({
      error: "Error al obtener estadísticas",
      message: error.message,
    });
  }
});

// Endpoint para limpiar cache (útil durante desarrollo)
app.post("/clear-cache", async (req, res) => {
  try {
    // En un entorno real, aquí podrías implementar limpieza de cache
    res.json({ message: "Cache limpiado correctamente" });
  } catch (error) {
    res.status(500).json({
      error: "Error al limpiar cache",
      message: error.message,
    });
  }
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    available_endpoints: [
      "GET /health - Estado del servidor",
      "GET /images - Obtener imágenes de la boda",
      "GET /stats - Estadísticas de la galería",
    ],
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error("❌ Error no manejado:", error);
  res.status(500).json({
    error: "Error interno del servidor",
    message: error.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Cloudinary corriendo en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   - GET  http://localhost:${PORT}/health`);
  console.log(`   - GET  http://localhost:${PORT}/images`);
  console.log(`   - GET  http://localhost:${PORT}/stats`);
});
