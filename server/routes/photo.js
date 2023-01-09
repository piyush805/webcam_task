import { postImage } from "../controllers/photo.js";
import express from "express"
import { verifyToken } from "../verifyToken.js";
import multer from "multer"
const router = express.Router();
import Photo from "../models/Photo.js";

const storage = multer.diskStorage({
    destination: "./public/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("myfile");
// UPLOAD IMAGE
router.post("/post", (req, res) => {
    upload(req, res, () => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        const file = new Photo();
        file.meta_data = req.file;
        file.save().then(() => {
            res.send({ message: "uploaded successfully" })
        })
        /*Now do where ever you want to do*/
    });
});

export default router;