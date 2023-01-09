import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../error.js";
import User from "../models/User.js";
import dotenv from "dotenv"
import Photo from "../models/Photo.js";
import fs from "fs"
import path from "path"
dotenv.config();

export const postImage = async (req,res) => {
    upload(req, res, () => {
       console.log("Request ---", req.body);
       console.log("Request file ---", req.file);//Here you get file.
       const file = new File();
       file.meta_data = req.file;
       file.save().then(()=>{
       res.send({message:"uploaded successfully"})
       })
       /*Now do where ever you want to do*/
    });
 }
