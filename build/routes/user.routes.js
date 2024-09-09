"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userControllers = require("../controllers/user.controllers.js");
var _protectRouteMiddleware = _interopRequireDefault(require("../middlewares/protectRoute.middleware.js"));
var _searchHistoryMiddleware = _interopRequireDefault(require("../middlewares/searchHistory.middleware.js"));
var _contactUsController = require("../controllers/contactUs.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/signup", _userControllers.signupUser);
router.post("/login", _userControllers.loginUser);
router.get("/user-info", _protectRouteMiddleware["default"], _userControllers.searchUserInfo);
router.post("/contact-us", _contactUsController.createContactUs);
router.post("/resetPassword", _protectRouteMiddleware["default"], _userControllers.resetPassword);
router.get("/logout", _userControllers.logout);
var _default = exports["default"] = router;