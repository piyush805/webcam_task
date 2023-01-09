
import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
    {
        photo: {
            data: Buffer,
            contentType: String,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            default: "",
        },
        meta_data:{}
    },
    { timestamps: true }
);

export default mongoose.model("Photo", PhotoSchema);