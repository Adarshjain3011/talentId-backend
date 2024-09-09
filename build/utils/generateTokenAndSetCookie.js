"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var generateTokenAndSetCookie = function generateTokenAndSetCookie(userId, res) {
  var token = _jsonwebtoken["default"].sign({
    userId: userId
  }, process.env.JWT_SECRET, {
    expiresIn: "15d"
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    //more secure
    maxAge: 15 * 24 * 60 * 60 * 1000,
    //15days
    sameSite: "strict" //csrf
  });
  return token;
};
var _default = exports["default"] = generateTokenAndSetCookie;