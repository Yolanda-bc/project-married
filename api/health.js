export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  return res.status(200).json({
    status: "ok",
    message: "Servidor de Cloudinary (Vercel) funcionando",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
  });
}
