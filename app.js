import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose"; // load mongoose library

import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter";

const app = express();
// connect mongoose to the tuiter database
// console.log(CONNECTION_STRING);
mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
mongoose.connect(CONNECTION_STRING);
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
const port = process.env.PORT || 4000;

TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(port);
