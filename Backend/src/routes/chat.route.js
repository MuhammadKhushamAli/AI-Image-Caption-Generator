import { Router } from "express";
import { verifyTokens } from "../middlewares/auth.middleware.js";
import {
    addChat,
    deleteChat,
    viewChat
} from "../controllers/chat.controller.js";
import { uploader } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-chat").post(verifyTokens,
    uploader.single("image")
    ,addChat);
router.route("/delete-chat/:chatID").delete(verifyTokens, deleteChat);
router.route("/view-chat/:chatID").get(verifyTokens, viewChat);

export default router;
