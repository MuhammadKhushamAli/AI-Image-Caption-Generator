import { ApiResponse } from "../utils/ApiRespnse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (user) => {
  try {
    if (!user) throw new ApiError(404, "User not Found");

    const accessToken = await user.generateAccessToken();
    if (!accessToken) throw new ApiError(500, "Access Token not Generated");

    const refreshToken = await user.generateRefreshToken();
    if (!refreshToken) throw new ApiError(500, "Refresh Token not Generated");

    await User.findByIdAndUpdate(user?._id, {
      $set: {
        refreshToken,
      },
    });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "Error in Generating Refresh and Access Token");
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req?.body;

  if (
    [userName, fullName, email, password].some(
      (field) => !field || field?.trim() === ""
    )
  )
    throw new ApiError(400, "All Fields are Required");

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existingUser) throw new ApiError(409, "User Already Exists");

  const newUser = await User.create({
    userName,
    fullName,
    email,
    password,
  });
  if (!newUser) throw new ApiError(500, "Cannot Create User");

  const { refreshToken, accessToken } =
    await generateAccessAndRefreshToken(newUser);

  const user = await findById(newUser?._id).select("-password -refreshToken");
  if (!user) throw new ApiError(500, "User is not Created");

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User Successfully Created", {
        user,
        refreshToken,
        accessToken,
      })
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  email = email?.trim();
  if (!(email && password))
    throw new ApiError(400, "Both Email and Password Required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not Found");

  if (user?.refreshToken) throw new ApiError(409, "Already Logged In");

  const { refreshToken, accessToken } =
    await generateAccessAndRefreshToken(user);

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) throw new ApiError(500, "Unable to get User Detail");

  const options = {
    httpsOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "Logged In Successfully", {
        user: loggedInUser,
        refreshToken,
        accessToken,
      })
    );
});

export const getCurrentUser = (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Current User Successfully Fetched", req?.user));
};

export const refreshTokens = asyncHandler(async (req, res) => {
  const token = req?.cookies?.refreshToken || req?.body?.refreshToken;
  if (!token) throw new ApiError(404, "Token Not Found");

  const decodeToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  if (!decodeToken) throw new ApiError(500, "Invalid Token");

  const user = await User.findById(decodeToken?._id);
  if (!user) throw new ApiError(404, "User not Found");

  if (user?.refreshToken !== token)
    throw new ApiError(401, "Unauthorized Access");

  const { refreshToken, accessToken } = generateAccessAndRefreshToken(user);

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "New Tokens Recieved", {
        refreshToken,
        accessToken,
      })
    );
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req?.user?._id, {
    $unset: { refreshToken: 1 },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Successfully Logged-Out"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const [oldPassword, newPassword] = req?.body;

  if (!(oldPassword && newPassword))
    throw new ApiError(400, "All Fields Are Required");

  const user = await User.findById(req?.user?._id);
  if (!user) throw new ApiError(500, "Error in Fetching User Details");

  if (!(await user.isPasswordValid(oldPassword)))
    throw new ApiError(401, "Invalid Old Password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Password Successfully Changed"));
});
