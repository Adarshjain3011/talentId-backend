"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var contactUsSchema = new _mongoose["default"].Schema({
  fullname: {
    type: String,
    required: true
  },
  company: {
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
  queryOptions: {
    type: String,
    "enum": ["Pricing Query", "Partnership inquiries", "Affiliate program", "Integration Partnership", "Book a demo", "Others"],
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var ContactUs = _mongoose["default"].model("ContactUs", contactUsSchema);
var _default = exports["default"] = ContactUs;