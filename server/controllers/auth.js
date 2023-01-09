import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../error.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
import otpGenerator from 'otp-generator'

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
});

export const register = async (req, res, next) => {
    try {
        //Check email user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) return next(createError(403, "User already registered"));
        const newUser = new User(req.body);
        //save user and respond
        const user1 = await newUser.save();
        res.status(200).json("User registered");
    } catch (err) {
        next(err);
    }
}

export const otp = async (req, res, next) => {
    try {
        //Check email user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));
        //Generate OTP
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log(otp);
        //Generate expiry time 5 minutes from now
        let date1 = new Date();
        date1.setMinutes(date1.getMinutes() + 5);

        //Set otp and expiry time for this req.user
        await user.updateOne(
            { $set: { otp: otp, expiry: date1 } }
        )
        //Send OTP mail to req.user 
        const mailConfigurations = {
            from: process.env.EMAIL_USERNAME,
            to: req.body.email,
            subject: 'OTP for 4brains',
            text: 'Hi! OTP for loggin in to 4brains app is '
                + otp
                + '. OTP remains valid only for 5 minutes'
        };
        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) {
                console.log(error);
                return;
            };
        });
        res.status(200).json('Email Sent Successfully')
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        //Check email credentials
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));
        //Check if otp has expired
        if (user.expiry < Date.now()) return next(createError(400, "OTP has expired! Try resending"))
        //Check if otp is correct
        if (req.body.otp != user.otp) return next(createError(400, "Wrong OTP!"))
        //Generate access_token for successful login
        await user.updateOne({ $set: { otp: "" } })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        //send token in cookie and user info as json
        res
            .cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(user);
    } catch (error) {
        next(error);
    }
}
export const logout = async (req, res, next) => {
    try {
        //Check email credentials
        const user = await User.findById(req.user.id);
        if (!user) return next(createError(404, "User not logged in!"));
        //clear access token 
        res.clearCookie('access_token');
        res.status(200).json("Logged out");
    } catch (error) {
        next(error);
    }
}
