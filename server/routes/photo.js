import { postImage } from "../controllers/photo.js";
import express from "express"
import dotenv from "dotenv"
import { verifyToken } from "../verifyToken.js";
import multer from "multer"
const router = express.Router();
import Photo from "../models/Photo.js";
import { GridFsStorage } from "multer-gridfs-storage"
dotenv.config();
const url = process.env.MONGO
// Create a storage object with a given configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// UPLOAD IMAGE
router.post("/post", upload.single("avatar"), (req, res) => {
    console.log(req.body)
    const file = req.file
    // Respond with the file details
    res.send({
        message: "Uploaded",
        id: file.id,
        name: file.filename,
        contentType: file.contentType,
    })
});

export default router;