import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const result = await cloudinary.search
      .expression("tags:boda-javi-jessi AND resource_type:image")
      .aggregate("resource_type")
      .execute();

    return res.status(200).json({
      total_images: result.total_count,
      last_updated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error Cloudinary (api/stats):", error);
    return res.status(500).json({
      error: "Error al obtener estadísticas",
      message: error.message,
    });
  }
}
