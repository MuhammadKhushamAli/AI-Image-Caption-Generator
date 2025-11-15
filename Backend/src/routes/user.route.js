import {Router} from "express";
import {
    changePassword,
    getCurrentUser,
    getUserHistory,
    login,
    logout,
    otpGetter,
    refreshTokens,
    registerUser
} from "../controllers/user.controller.js";
import {
    verifyTokens
} from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register-user").post(registerUser);
router.route("/login").post(login);

//Protected Routes
router.route("/current-user").get(verifyTokens, getCurrentUser);
router.route("/refresh-tokens").get(verifyTokens, refreshTokens);
router.route("/logout").get(verifyTokens, logout);
router.route("/change-password").patch(verifyTokens, changePassword);
router.route("/otp-get").get(verifyTokens, otpGetter);
router.route("/user-history").get(verifyTokens, getUserHistory);

export default router;