const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

app.get("/images", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("tags:boda-javi-jessi AND resource_type:image")
      .sort_by("created_at", "desc")
      .max_results(30)
      .execute();

    res.json(result.resources);
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor Cloudinary corriendo en http://localhost:${PORT}`);
});
