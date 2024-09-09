"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _connectDB = _interopRequireDefault(require("./db/connectDB.js"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
(0, _connectDB["default"])();
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000;
console.log("port is ", process.env.PORT);
app.use((0, _cors["default"])()); //enable cors
app.use(_express["default"].json()); // parsing json data of req.body
app.use(_express["default"].urlencoded({
  extended: true
})); // to parse form data in the req.body
app.use((0, _cookieParser["default"])()); // to parse cookies in the req.cookies

app.use("/api/users", _userRoutes["default"]);
app.listen(4000, function () {
  console.log("Server started at http://localhost:".concat(PORT));
});
app.get("/", function (req, res) {
  res.send("Welcome to Talent ID API");
});