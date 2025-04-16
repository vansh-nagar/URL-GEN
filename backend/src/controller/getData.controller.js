import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  UploadOnCloudinary,
  DeleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Link } from "../models/link.models.js";
import { response } from "express";

const getFilterData = asyncHandler(async (req, res) => {
  const selectedFilter = req.params.filter;

  if (!selectedFilter) {
    throw new apiResponse(400, "select a filter");
  }

  let response;
  if (selectedFilter === "RecentlyCreated") {
    response = await Link.aggregate([
      { $match: { owner: req.user.CloudUsername } },
      {
        $sort: { createdAt: -1 },
      },
    ]);
  }

  if (selectedFilter === "mostUsed") {
    response = await Link.aggregate([
      { $match: { owner: req.user.CloudUsername } },
      {
        $sort: { copyCount: -1 },
      },
    ]);
  }

  if (selectedFilter === "image") {
    response = await Link.aggregate([
      { $match: { owner: req.user.CloudUsername, type: req.params.filter } },
    ]);
  }
  if (selectedFilter === "video") {
    response = await Link.aggregate([
      { $match: { owner: req.user.CloudUsername, type: req.params.filter } },
    ]);
  }

  res
    .status(200)
    .json(new apiResponse(200, "fetched data succesfully", response));
});

export { getFilterData };
