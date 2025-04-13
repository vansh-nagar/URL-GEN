import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration

const UploadOnCloudinary = async (
  localFilePath,
  CloudUsername,
  apiKey,
  apiSecret
) => {
  try {
    cloudinary.config({
      cloud_name: `${CloudUsername}`,
      api_key: `${apiKey}`,
      api_secret: `${apiSecret}`, // Click 'View API Keys' above to copy your API secret
      secure: true,
    });

    if (!localFilePath) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);

    console.log("uploaded");

    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { UploadOnCloudinary };
