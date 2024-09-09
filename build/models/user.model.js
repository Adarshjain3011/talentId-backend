"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var searchHistorySchema = new _mongoose["default"].Schema({
  emailSearched: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
var userSchema = new _mongoose["default"].Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    minLength: 10,
    maxLength: 10
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "enum": ["Admin", "User"],
    required: true
  },
  password: {
    type: String,
    minLength: 8,
    required: true
  },
  credits: {
    type: Number,
    "default": 100
  },
  searchHistory: [searchHistorySchema]
}, {
  timestamps: true
});
var User = _mongoose["default"].model("User", userSchema);
var _default = exports["default"] = User;