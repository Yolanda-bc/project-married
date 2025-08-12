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
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const imagesWithInfo = result.resources.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
      url: img.url,
      format: img.format,
      width: img.width,
      height: img.height,
      bytes: img.bytes,
      created_at: img.created_at,
      thumbnail_url: cloudinary.url(img.public_id, {
        width: 300,
        height: 300,
        crop: "fill",
        quality: "auto",
        format: "auto",
      }),
    }));

    return res.status(200).json(imagesWithInfo);
  } catch (error) {
    console.error("Error Cloudinary (api/images):", error);
    return res.status(500).json({
      error: "Error al obtener imágenes",
      message: error.message,
    });
  }
}
