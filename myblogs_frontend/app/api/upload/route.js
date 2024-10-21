const cloudinary = require("cloudinary").v2; 
import { NextResponse } from "next/server";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export async function POST(request) {
    try {
        const body = await request.json();
        const fileStr = body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr)
        return NextResponse.json({url : uploadedResponse.secure_url});
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}