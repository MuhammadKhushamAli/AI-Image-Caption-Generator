import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadToCloudinary(filePath)
{
    try {
        filePath = filePath?.trim();
        if(!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });
    
        fs.unlinkSync(filePath);
        console.log("File Uploaded To Cloudinary");
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        throw "Error in Uploading to CLoudinary";
    }
}