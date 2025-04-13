import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";
import { User } from "../models/user.models.js";

const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", ""); //.reaplace - js method replace particular string from a string

    if (!token) {
      throw new ApiError(401, "unauthorized Token");
    }

    const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_STRINGS);

    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "invalid access token");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
  }
});

export { verifyJwt };
