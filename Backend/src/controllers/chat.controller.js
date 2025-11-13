import { use } from "react";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespnse";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const addChat = asyncHandler(async (req, res) => {
  const image = req?.file?.path;
  if (!image) throw new ApiError(400, "Image Must be Required");

  const { caption } = req?.body;
  caption = caption?.trim();
  if (!caption) throw new ApiError(400, "Caption Must be Required");

  const cloudImage = await uploadToCloudinary(image);
  if (!cloudImage)
    throw new ApiError(500, "Unable to Upload Image on Cloudinary");

  const chat = Chat.create({
    name: req?.file?.filename,
    caption,
    image: cloudImage?.url,
    owner: req?.user?._id,
  });
  if (!chat) throw new ApiError(500, "Unable to Create Chat");

  const user = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $addToSet: { history: chat?._id}
        },
        {
            new: true
        }
    )
    if(!user) throw new ApiError(500, "Unable to Update User History");

  res.status(200).json(new ApiResponse(200, "Chat is Created", chat));
});

export const viewChat = asyncHandler(async (req, res) => {
  const { chatID } = req?.params;
  chatID = chatID?.trim();

  if (!chatID) throw new ApiError(400, "Chat ID Must be Required");

  const chat = await Chat.findOne({ _id: chatID, owner: req?.user?._id });
  if (!chat) throw new ApiError(404, "Chat Not Found");

  res
    .status(200)
    .json(new ApiResponse(200, "Chat is Successfully Fetched", chat));
});

export const deleteChat = asyncHandler(async (req, res) => {
    const {chatID} = req?.params;
    chatID = chatID?.trim();
    if(!chatID) throw new ApiError(400, "Chat ID Must be Required");

    const chat = await Chat.findOne({_id: chatID, owner: req?.user?._id});
    if(!chat) throw new ApiError(404, "Chat not Found");

    if(
        !(await deleteFromCloudinary(chat.image))
    ) throw new ApiError(500, "Unable to Delete Image");

    const deletedChat = await Chat.findByIdAndDelete(chatID);
    if(!deletedChat) throw new ApiError(500, "Unable to Delete Chat");

    const user = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $pull: { history: chatID}
        },
        {
            new: true
        }
    )
    if(!user) throw new ApiError(500, "Unable to Update User History");

    res.status(200)
    .json(
        new ApiResponse(
            200,
            "Chat SuccessFully Deleted"
        )
    )

})
