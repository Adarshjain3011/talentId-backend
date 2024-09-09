import { users } from "../db/dummy.db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const signupUser = async (req, res) => {
  try {
    const { fullname, email, phone, company, role, password } = req.body;

    if (!fullname || !email || !phone || !company || !role || !password) {

      res.status(400).json({

        data: null,
        message: "Please provide all the required fields",
        error: error.message,

      })

    }

    const user = await User.findOne({ email });

    if (user) {

      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = new User({
      fullname,
      email,
      phone,
      company,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({

      success: true,
      data: newUser,
      message: "User registered successfully",
      error: null,

    })

  } catch (error) {

    res.status(500).json({ message: error.message });
    console.log("Error in signupUser", error.message);

  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {

      res.status(500).json({

        data: null,
        message: "all fields required",
        error: null,

      });

    }

    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect)
      return res.status(400).json({ message: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role,
    });

  }

  catch (error) {

    res.status(500).json({ message: error.message });
    console.log("Error in loginUser", error.message);
  }
};

const searchUserInfo = async (req, res) => {
  try {
    const email = req.query.email;

    console.log("email is ", email);
    const authenticatedUserId = req.user._id;

    console.log("authenticated user", authenticatedUserId);
    const authenticatedUser = await User.findById(authenticatedUserId);

    if (!authenticatedUser) {
      return res.status(404).json({ message: "Authenticated user not found" });
    }

    if (authenticatedUser.credits <= 0) {
      return res.status(403).json({ message: "Insufficient credits" });
    }

    // Find the user by email

    const user = await User.find({ email: email }); // we replace finding the email by the company database 


    // reduce credit by one and save the info
    authenticatedUser.credits -= 1;
    authenticatedUser.searchHistory.push({
      emailSearched: email,
      timestamp: new Date(),
    });
    await authenticatedUser.save();
    if (!user) {
      return res.status(404).json({ message: "Searched user not found" });
    }

    // we implement it after getting the information

    // if (user) {
    //   // Extract necessary information
    //   const userInfo = {
    //     name: user.name,
    //     interviews: user.interviews.map((interview) => ({
    //       companyName: interview.companyName,
    //       interviewStatus: interview.interviewStatus,
    //       totalRoundsOfInterviews: interview.totalRoundsOfInterviews,
    //     })),
    //   };

    //   res.json(userInfo);
    // }

    return res.status(200).json({

      message: "user details were updated successfully",
      data: user,
      error: null,

    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in searchUserInfo", error.message);
  }
};

const resetPassword = async (req, res) => {

  try {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {

      res.status(400).json({

        data: null,
        message: "Please provide all the required fields",
        error: null,

      })
    }

    if (password !== confirmPassword) {

      res.status(400).json({

        data: null,
        message: "Password dosent match ",
        error: null,

      })

    }

    console.log();

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({ message: "User not found" });

    }

    const hashedPassword = await bcrypt.hash(password, 6);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({

      message: "Password updated successfully",
      data: null,
      error: null,

    });

  } catch (error) {

    res.status(500).json({

      data: null,
      message: error.message

    });

  }

}


const forgotPassword = (req, res) => {

  // TODO 

}



const logout = async (req, res) => {
  try {
    // Check if user exists
    if (!req.cookies.jwt) {
      return res.status(400).json({
        message: "No user found",
        data: null,
        error: null,
      });
    }

    // Clear the JWT cookie
    res.clearCookie("jwt", { path: "/" });

    // Send a success response
    res.status(200).json({

      msessage:"user logged out successfully",
      data: null,
      error: null,

    }); // 204 No Content for successful logout


  } catch (error) {
    // Handle any errors that occurred during logout
    res.status(500).json({
      data: null,
      message: "Some error occurred while logging out",
      error: error.message,
    });
  }
};


export { searchUserInfo, signupUser, loginUser, resetPassword, logout };

