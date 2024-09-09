import express from "express";
import {
  loginUser,
  searchUserInfo,
  signupUser,
  resetPassword,
  logout,
} from "../controllers/user.controllers.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import logSearch from "../middlewares/searchHistory.middleware.js";
import { createContactUs } from "../controllers/contactUs.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user-info", protectRoute, searchUserInfo);
router.post("/contact-us", createContactUs);

router.post("/resetPassword",protectRoute,resetPassword);

router.get("/logout",logout);

export default router;
