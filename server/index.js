import express from "express"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import photoRoutes from "./routes/photo.js"
import cors from "cors";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

dotenv.config();

mongoose.set('strictQuery', true); //terminal warning removal 

const app = express();

const connect = () => {
    mongoose.connect(process.env.MONGO, { useNewUrlParser: true }, () => {
        console.log("Connected to db...")
    })
}
//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/photo', photoRoutes);

// next error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(8080, () => {
    connect();
    console.log("Express server running...");
});
