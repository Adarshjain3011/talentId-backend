import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  emailSearched: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      minLength: 10,
      maxLength: 10,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    credits: {
      type: Number,
      default: 100,
    },
    searchHistory: [searchHistorySchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
