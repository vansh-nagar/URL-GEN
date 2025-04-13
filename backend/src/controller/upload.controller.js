import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { Link } from "../models/link.models.js";

const uploadFile = asyncHandler(async (req, res) => {
  const cloudinaryRes = await UploadOnCloudinary(
    req.file.path,
    req.user.CloudUsername,
    req.user.apiKey,
    req.user.apiSecret
  );

  if (!cloudinaryRes) {
    throw new ApiError(500, "someting went wrong while uploading file");
  }

  const createdLink = await Link.create({
    owner: req.user.CloudUsername,
    link: cloudinaryRes.url,
    fileName: cloudinaryRes.original_filename,
    type: cloudinaryRes.resource_type,
    copyCount: 0,
  });

  if (!createdLink) {
    throw new ApiError(500, "link not created");
  }

  res
    .status(200)
    .json(new apiResponse(200, "file uploaded Succesfully", createdLink));
});

export { uploadFile };
