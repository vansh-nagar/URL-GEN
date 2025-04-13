import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { Link } from "../models/link.models.js";

const getLinks = asyncHandler(async (req, res) => {
  const Links = await Link.find({ owner: req.user.CloudUsername });
  res.status(200).send(Links);
});
const deleteLinks = asyncHandler(async (req, res) => {
  const Links = await Link.find({ owner: req.user.CloudUsername });
  res.status(200).send(Links);
});

export { getLinks, deleteLinks };
