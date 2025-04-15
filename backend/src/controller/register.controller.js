import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

const generateAcessAndRefreshToken = async (userId) => {
  //id leni hai aur us id se db me user dhunna hai aur fir generate karnahai
  if (!userId) {
    throw new ApiError(400, "invalid userId to create token");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(401, "username not found");
  }

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccesToken();

  await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

  return { refreshToken, accessToken };
};

const registerUser = asyncHandler(async (req, res) => {
  //take input from body and validate
  const { CloudUsername, apiKey, apiSecret, password } = req.body;

  if (
    [CloudUsername, apiKey, apiSecret, password].some((field) => {
      return field.trim() === "";
    })
  ) {
    throw new ApiError(400, "all fields are required");
  }

  //cheak if user already exists
  const existingUser = await User.findOne({ CloudUsername, apiKey });

  if (existingUser) {
    throw new ApiError(400, "user already exists please login");
  }

  //validation- send a image on the given info if image is sent then save info to db || err
  const cloudinaryRes = await UploadOnCloudinary(
    req.file.path,
    CloudUsername,
    apiKey,
    apiSecret
  );

  if (!cloudinaryRes) {
    throw new ApiError(401, "invalid credentials || create cloudinary account");
  }

  //create new user in data base - User

  const user = await User.create({
    CloudUsername,
    apiKey,
    apiSecret,
    password,
  });
  const { refreshToken, accessToken } = await generateAcessAndRefreshToken(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-apiSecret -password"
  );

  if (!createdUser) {
    throw ApiError(500, "someting went wrong while creating account ");
  }

  // create accessToken and refresh token- add refrsh token to db and access token to cookie

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new apiResponse(200, "user created Succesfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { CloudUsername, password } = req.body;

  console.log(req.body);

  if (
    [CloudUsername, password].some((field) => {
      return field.trim() === "";
    })
  ) {
    throw new ApiError(400, "all credentials are required");
  }

  const foundUser = await User.findOne({ CloudUsername });

  if (!foundUser) {
    throw new ApiError(401, "No user found please SignUp");
  }

  const result = await foundUser.comparePassword(password);

  if (!result) {
    throw new ApiError(400, "username and password incorrect");
  }

  const { refreshToken, accessToken } = await generateAcessAndRefreshToken(
    foundUser._id
  );

  const options = {
    httponly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, `logedin ${foundUser.CloudUsername} Succesfully`)
    );
});

const changePassword = asyncHandler(async (req, res) => {
  // get new old pass
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (
    [oldPassword, newPassword, confirmPassword].some((e) => {
      return e.trim() === "";
    })
  ) {
    throw new ApiError(400, "all fields are required");
  }
  //cheak if the password matches the db password

  const foundUser = await User.findById(req.user._id);

  const comparePasswordResult = await foundUser.comparePassword(oldPassword);

  if (!comparePasswordResult) {
    throw new ApiError(400, "password does not match the old password");
  }

  //check both password are same
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "password does not match");
  }

  //if both new pass are same then change password
  foundUser.password = newPassword;
  await foundUser.save();

  res
    .status(200)
    .json(
      new apiResponse(200, "password changed successfully", foundUser.password)
    );
});
export { registerUser, loginUser, changePassword };
