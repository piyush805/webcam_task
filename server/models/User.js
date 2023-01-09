
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            min: 3,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            min: 10,
            unique: true,
        },
        otp: {
            type: String,
            default: "",
        },
        expiry: {
            type: Date,
            
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);