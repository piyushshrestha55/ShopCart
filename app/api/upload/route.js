import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file"); // file from client

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, uploaded) => {
          if (error) reject(error);
          else resolve(uploaded);
        })
        .end(buffer);
    });

    return new Response(JSON.stringify({ url: result.secure_url }), {
      status: 200
    });
  } catch (err) {
    console.error("Upload failed:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500
    });
  }
}
