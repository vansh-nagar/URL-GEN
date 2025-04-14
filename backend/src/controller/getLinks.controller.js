import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  UploadOnCloudinary,
  DeleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Link } from "../models/link.models.js";

const getLinks = asyncHandler(async (req, res) => {
  const Links = await Link.find({ owner: req.user.CloudUsername });
  res.status(200).send(Links);
});
const deleteLinks = asyncHandler(async (req, res) => {
  // get the ppublic id from body
  const { publicId } = req.body;

  // public id verification

  if (publicId.trim() === "") {
    throw new ApiError(400, " need valid publcId to delete from cloud");
  }

  //then delete from cloudinary
  const deleteResult = await DeleteFromCloudinary(
    publicId,
    req.user.CloudUsername,
    req.user.apiKey,
    req.user.apiSecret
  );

  // then delete from database
  const deletedLink = await Link.findOneAndDelete({ publicId });

  if (!deletedLink) {
    throw new ApiError(500, "Link don't existes");
  }

  res
    .status(200)
    .send(
      new apiResponse(
        200,
        `deleted ${deletedLink.fileName} from cloud || Db`,
        deletedLink.fileName
      )
    );
  // send response
});

export { getLinks, deleteLinks };
