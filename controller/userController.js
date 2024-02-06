import User from "../models/userModels.js";
import sendToken from "../utility/sendToken.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { sendMessageToKafka } from "./kafkaController.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.create({
      fullName,
      email,
      password,
    });
    const message = await sendMessageToKafka("Register User Successfully");
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
      message,
    });
  } catch (err) {
    console.log(err, "");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.comparePassword(password))) {
      sendToken(user, 200, res);
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.log(err, "Login Failed");
  }
};

export const resetVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: req.body.email,
      subject: "Reset password link",
      text: `http://localhost:3000/resetPassword/${user._id}`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(201).json({ message: "Mail sent successfully" });
  } catch (err) {
    console.log(err, "resetpassword failed");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    let newPassword = await bcryptjs.hash(password, 10);
    await user.updateOne({ password: newPassword });
    res.status(201).json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err, "resetpassword failed");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const message = await sendMessageToKafka("Get All Users");
    console.log("message", message);
    res.status(201).json({
      message: "All users",
      allUsers,
      message,
    });
  } catch (err) {
    res.status(400).json({
      message: "Bad Request",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    const message = await sendMessageToKafka("Delete User Successfully");
    res.status(201).json({
      message,
    });
  } catch (err) {
    res.status(401).json({
      message: "Request Not Found",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const message = await sendMessageToKafka("Get User Successfully");
    res.status(201).json({
      message,
      user,
    });
  } catch (err) {
    res.status(401).json({
      message: "Request Not Found",
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(401).json({
      message: "Request Not Found",
    });
  }
};
